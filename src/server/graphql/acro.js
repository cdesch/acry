var fs = require('fs');

const graphql = require("graphql");
const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const database = new sqlite3.Database("src/server/db/acro.db");

// Create graphql post object
const AcroType = new graphql.GraphQLObjectType({
  name: "Acro",
  fields: {
    id: { type: graphql.GraphQLID },
    acronym: { type: graphql.GraphQLString },
    definition: { type: graphql.GraphQLString },
    info: { type: graphql.GraphQLString },
    url: { type: graphql.GraphQLString },
    created_at: { type: graphql.GraphQLString },
    updated_at: { type: graphql.GraphQLString }
  }
});

// create a graphql query to select all and by id
var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    //first query to select all
    acros: {
      type: graphql.GraphQLList(AcroType),
      resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.all("SELECT * FROM Acros;", function(err, rows) {
            if(err){
              reject([]);
            }
            resolve(rows);
          });
        });
      }
    },
    acroSearch: {
      type: graphql.GraphQLList(AcroType),
      args:{
        name:{
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
      },
      resolve: (root, {name}, context, info) => {
        return new Promise((resolve, reject) => {
          database.all(`SELECT * FROM Acros WHERE acronym LIKE '%${name}%';`,[], function(err, rows) {
            if(err){
              reject([]);
            }
            resolve(rows);
          });
        });
      }
    },
    //second query to select by id
    acro:{
      type: AcroType,
      args:{
        id:{
          type: new graphql.GraphQLNonNull(graphql.GraphQLID)
        }
      },
      resolve: (root, {id}, context, info) => {
        return new Promise((resolve, reject) => {

          database.all("SELECT * FROM Acros WHERE id = (?);",[id], function(err, rows) {
            if(err){
              reject(null);
            }
            resolve(rows[0]);
          });
        });
      }
    }
  }
});

//define schema with post object, queries, and mustation
const schema = new graphql.GraphQLSchema({
  query: queryType,
});

//export schema to use on index.js
module.exports = {
  schema
}

