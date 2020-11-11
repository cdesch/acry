import React from "react";
import {Link, useParams} from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_ACRO } from '../lib/queries';
import { Card, CardBody, CardTitle, CardText, CardHeader, CardSubtitle, Spinner } from "reactstrap";

function ShowPage(props) {

  console.log("loading");
  let { id } = useParams();

  const { loading, error, data } = useQuery(GET_ACRO, {
    variables: { id }
  });
  if (loading) return <Spinner color="dark" />;
  if (error) return `Error! ${error}`;

  console.log("data:", data);
  const { acro } = data;

  return (
    <div className="container p-4">
      <h4 className="pb-2">
        <Link to={`/`}>Acronyms </Link> <span className="text-muted"> > {acro.acronym} - {id}</span>
      </h4>

      <Card>
        <CardHeader>
          {acro.acronym} - {id}
        </CardHeader>
        <CardBody>
          <CardTitle tag="h5">Card title</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
          <CardText>
            {acro.description}
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default ShowPage;