import React from "react";
import {Link, useParams} from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import {GET_ACRO, SEARCH_ACRO} from '../lib/queries';
import {Spinner, Table} from "reactstrap";

function IndexPage(props) {

  console.log("loading");
  let { id } = useParams();
  const name = "AA"
  const getPosts = useQuery(SEARCH_ACRO, {
    variables: { name }
  });
  if (getPosts.loading) return <Spinner color="dark" />;
  if (getPosts.error) return `Error! ${getPosts.error}`;

  console.log("data:", getPosts.data);

  const listItems = getPosts.data.acroSearch.map((item) =>
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
    <div className="container p-4">
      <h4 className="pb-2">Acronyms</h4>
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

export default IndexPage;