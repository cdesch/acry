import React from "react";
import { useParams } from "react-router-dom";

function Welcome(props) {
  let { id } = useParams();

  return <h1>Hello, {props.name} {id}</h1>;
}

export default Welcome;