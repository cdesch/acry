const  express  =  require('express');
const { graphqlHTTP } = require('express-graphql')
// const schema = require("./graphql/post.js");
const schema = require("./graphql/acro.js");
const cors = require('cors');
const app  =  express();
app.use(cors());

app.use("/graphql", graphqlHTTP({ schema: schema.schema, graphiql: true}));

app.listen(4000, () => {
  console.log("GraphQL server running at http://localhost:4000.");
});