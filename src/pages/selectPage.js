// import React, { Component } from 'react';
//
// import Select, { components } from 'react-select';
// const colourOptions = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]
// const controlStyles = {
//   borderRadius: '1px solid black',
//   padding: '5px',
//   // background: colourOptions[2].color,
//   color: 'white',
// };
//
// const ControlComponent = props => (
//   <div style={controlStyles}>
//     <p>hi</p>
//     {<p>Custom Control</p>}
//     <components.Control {...props} />
//   </div>
// );
//
//
// export default class CustomControl extends Component {
//   state = {};
//   render() {
//     return (
//       <Select
//         defaultValue={colourOptions[0]}
//         isClearable
//         components={{ Control: ControlComponent }}
//         isSearchable
//         name="color"
//         options={colourOptions}
//       />
//     );
//   }
// }

import React, { Fragment } from "react";
import Select, { components } from "react-select";
const colourOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
const Option = (props) => {
  return (
    <Fragment>
      <components.Option {...props}>hi {props.children}</components.Option>
    </Fragment>
  );
};

class Component extends React.Component {
  render() {
    return (
      <Select
        options={colourOptions}
        components={{ Option: Option }} />
    );
  }
}
export default Component