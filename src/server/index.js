const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const POSTS = [
  { author: "John Doe", body: "Hello world" },
  { author: "Jane Doe", body: "Hi, planet!" },
];

const ACROS = require("../data/acro.json")

const schema = buildASTSchema(gql`
  type Query {
    posts: [Post]
    post(id: ID!): Post
    acros: [Acro]
    acro(id: ID!): Acro
  }

  type Post {
    id: ID
    author: String
    body: String
  }
  
  type Acro {
    id: ID
    acronym: String
    definition: String
    info: String
  }
  
`);

const mapPost = (post, id) => post && ({ id, ...post });

const root = {
  posts: () => POSTS.map(mapPost),
  post: ({ id }) => mapPost(POSTS[id], id),

  acros: () => ACROS,
  acro: ({ id }) => ACROS.find(x => x.id.toString() === id)

};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);