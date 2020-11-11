import React from "react";
import { Table } from 'reactstrap';

import data from "../data/acro.json"
import { Link } from "react-router-dom";

export default class IndexPage extends React.Component {

  render() {
    const listItems = data.map((item) =>
      <tr key={item.id}>
        <th scope="row">
          <Link to={`/acro/${item.id}`}>
            {item.id}
          </Link>
        </th>
        <td>{item.acronym}</td>
        <td>{item.definition}</td>
        <td>{item.info}</td>
      </tr>
    );

    return (
      <div>
        <h2>Hi, I am a Index!</h2>
        <Table>
          <thead>
          <tr>
            <th>#</th>
            <th>Acronym</th>
            <th>Definition</th>
            <th>Info</th>
          </tr>
          </thead>
          <tbody>

          {listItems}
          </tbody>
        </Table>
      </div>
    );
  }
}