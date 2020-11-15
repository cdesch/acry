const  express  =  require('express');
const { graphqlHTTP } = require('express-graphql')
const schema = require("./graphql/acro.js");
const cors = require('cors');
const app = express();
const { Op } = require("sequelize");
const { sequelize } = require("./db/models");
const Acro = sequelize.models.Acro;

app.use(cors());

//http://localhost:4000/api/v1/users
app.get('/api/v1/users', (req, res) => {
  return res.send('GET HTTP method on user resource');
});

//http://localhost:4000/api/v1/users/333
app.get('/api/v1/users/:userId', (req, res) => {
  // users[req.params.userId]
  console.log(req.params.userId);
  return res.send(`GET HTTP method on user resource ${req.params.userId}`);
});


// http://localhost:4000/api/v1/search?q=AA
app.get('/api/v1/search', async (req, res) => {
  console.log(req.query.q);
  console.log(req.query);
  const acros = await Acro.findAll({
    where: {
      acronym: { [Op.like]: `%${req.query.q}%` }
    }
  });
  return res.send(acros.map(acro => acro.toJSON()));
});

app.use("/graphql", graphqlHTTP({ schema: schema.schema, graphiql: true}));

app.listen(4000, () => {
  console.log("GraphQL server running at http://localhost:4000.");
});