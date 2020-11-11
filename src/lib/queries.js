import { gql } from "apollo-boost";

export const GET_POSTS = gql`
  {
    posts {
      id
      author
      body
    }
  }
`;



export const GET_POST = gql`
  {
    post(id:1) {
      id
      author
      body
    }
  }
`;


export const GET_ACROS = gql`
  {
     acros {
        id
        acronym
        definition
        info
      }
    }
`;


export const GET_ACRO = gql`
  query Acro($id: ID!) {
    acro(id: $id) {
      id
      acronym
      definition
      info
    }
  }
`;


export const SEARCH_ACRO = gql`
  query Acro($name: String!) {
    acroSearch(name: $name) {
      id
      acronym
      definition
      info
    }
  }
`;
//
// query  {
//   acroSearch(name:"AA") {
//     id
//     acronym
//     definition
//
//   }
// }

