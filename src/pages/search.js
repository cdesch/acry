import React, { Fragment, Component } from "react";
import Select, { components } from "react-select";

// import Tooltip from '@atlaskit/tooltip';
// import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
// import { colourOptions } from '../data';
const colourOptions = [
  { value: 'chocolate', label: 'Chocolate', id: "1" },
  { value: 'strawberry', label: 'Strawberry', id: "2" },
  { value: 'vanilla', label: 'Vanilla', id: "3" }
]


const formatOptionLabel = ({ value, label, id, acronym, definition }) => (
  <div style={{ display: "flex" }}>
    <div>{acronym}</div>
    <div style={{ marginLeft: "10px", color: "#ccc" }}>
      {definition} - {id}
    </div>
  </div>
);


const Option = (props) => {
  // console.log("props", props);
  return (
    <Fragment>
      <components.Option {...props}>{props.children}</components.Option>
    </Fragment>
  );
};


const loadOptions = (inputValue, callback) => {
  // setTimeout(() => {
  //   callback(filterColors(inputValue));
  // }, 1000);
  axios.get('http://localhost:4000/api/v1/search', {
    params: {
      q: inputValue
    }
  })
    .then(function (response) {
      // handle success
      callback(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
};

export default class SearchPage extends Component {
  state = { inputValue: '' };
  handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };

  handleChange = (newValue) => {
    console.log("handleChange", newValue);
    this.props.history.push(`/acro/${newValue.id}`);

  }

  render() {
    return (
      <div className="container p-4">
        <h4 className="pb-2">Acronyms</h4>

        <pre>inputValue: "{this.state.inputValue}"</pre>
        <AsyncSelect
          cacheOptions
          loadOptions={ loadOptions }
          defaultOptions
          onInputChange={this.handleInputChange}
          onChange={this.handleChange}
          components={{ Option: Option }}
          // formatOptionLabel={option => `${option.label} - ${option.value}`}
          formatOptionLabel={formatOptionLabel}

          // getOptionLabel={({ name }) => name}
          getOptionLabel={option => option.acronym}
          getOptionValue={option => option.id}

        />
      </div>
    );
  }
}