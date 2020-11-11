var fs = require('fs');

const graphql = require("graphql");
const sqlite3 = require('sqlite3').verbose();

//create a database if no exists
const database = new sqlite3.Database("micro-blog.db");
//create a table to insert post
const createPostTable = () => {
  const  query  =  `
        CREATE TABLE IF NOT EXISTS acros (
        id integer PRIMARY KEY,
        acronym text,
        definition text,
        info text,
        url text,
        created_at text,
        updated_at text)`;

  return  database.run(query);
}

const createPosts = () => {
  const  query  =  `
   INSERT or ignore INTO acros (acronym, created_at,definition,id,info,updated_at,url) VALUES ('1LS/2LS/3LS','2013-05-16T10:22:35Z','1st, 2nd or 3rd Line Support',76,NULL,'2013-05-16T10:22:35Z',NULL) ;
`;
  return database.run(query);
}
const createAcros = () => {
  const  query  =  `
    INSERT or ignore INTO acros (acronym,created_at,definition,id,info,updated_at,url) VALUES ('AA','2013-06-17T08:51:10Z','Administrative Assistants',85,'in context of PVB','2013-06-17T08:51:10Z',NULL);
`;
  return database.run(query);
}


//call function to init the post table
createPostTable();
try {
  createPosts();
} catch (error) {
  console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}
try {
  createAcros();
} catch (error) {
  console.error(error);
}


//creacte graphql post object
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
          database.all("SELECT * FROM acros;", function(err, rows) {
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
        console.log("here");
        return new Promise((resolve, reject) => {
          console.log("name", name);
          database.all(`SELECT * FROM acros WHERE acronym LIKE '%${name}%';`,[], function(err, rows) {
            console.log(rows);
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

          database.all("SELECT * FROM acros WHERE id = (?);",[id], function(err, rows) {
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
// //mutation type is a type of object to modify data (INSERT,DELETE,UPDATE)
// var mutationType = new graphql.GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     //mutation for creacte
//     createPost: {
//       //type of object to return after create in SQLite
//       type: PostType,
//       //argument of mutation creactePost to get from request
//       args: {
//         title: {
//           type: new graphql.GraphQLNonNull(graphql.GraphQLString)
//         },
//         description:{
//           type: new graphql.GraphQLNonNull(graphql.GraphQLString)
//         },
//         createDate:{
//           type: new graphql.GraphQLNonNull(graphql.GraphQLString)
//         },
//         author:{
//           type: new graphql.GraphQLNonNull(graphql.GraphQLString)
//         }
//       },
//       resolve: (root, {title, description, createDate, author}) => {
//         return new Promise((resolve, reject) => {
//           //raw SQLite to insert a new post in post table
//           database.run('INSERT INTO Posts (title, description, createDate, author) VALUES (?,?,?,?);', [title, description, createDate, author], (err) => {
//             if(err) {
//               reject(null);
//             }
//             database.get("SELECT last_insert_rowid() as id", (err, row) => {
//
//               resolve({
//                 id: row["id"],
//                 title: title,
//                 description: description,
//                 createDate:createDate,
//                 author: author
//               });
//             });
//           });
//         })
//       }
//     },
//     //mutation for update
//     updatePost: {
//       //type of object to return afater update in SQLite
//       type: graphql.GraphQLString,
//       //argument of mutation creactePost to get from request
//       args:{
//         id:{
//           type: new graphql.GraphQLNonNull(graphql.GraphQLID)
//         },
//         title: {
//           type: new graphql.GraphQLNonNull(graphql.GraphQLString)
//         },
//         description:{
//           type: new graphql.GraphQLNonNull(graphql.GraphQLString)
//         },
//         createDate:{
//           type: new graphql.GraphQLNonNull(graphql.GraphQLString)
//         },
//         author:{
//           type: new graphql.GraphQLNonNull(graphql.GraphQLString)
//         }
//       },
//       resolve: (root, {id, title, description, createDate, author}) => {
//         return new Promise((resolve, reject) => {
//           //raw SQLite to update a post in post table
//           database.run('UPDATE Posts SET title = (?), description = (?), createDate = (?), author = (?) WHERE id = (?);', [title, description, createDate, author, id], (err) => {
//             if(err) {
//               reject(err);
//             }
//             resolve(`Post #${id} updated`);
//           });
//         })
//       }
//     },
//     //mutation for update
//     deletePost: {
//       //type of object resturn after delete in SQLite
//       type: graphql.GraphQLString,
//       args:{
//         id:{
//           type: new graphql.GraphQLNonNull(graphql.GraphQLID)
//         }
//       },
//       resolve: (root, {id}) => {
//         return new Promise((resolve, reject) => {
//           //raw query to delete from post table by id
//           database.run('DELETE from Posts WHERE id =(?);', [id], (err) => {
//             if(err) {
//               reject(err);
//             }
//             resolve(`Post #${id} deleted`);
//           });
//         })
//       }
//     }
//   }
// });

//define schema with post object, queries, and mustation
const schema = new graphql.GraphQLSchema({
  query: queryType,
  // mutation: mutationType
});

//export schema to use on index.js
module.exports = {
  schema
}

