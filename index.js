const express = require('express')
const priv = require('dotenv').config()
const path = require('path')
const expGraphql = require('express-graphql')


const app=express()
const schema = require('./models/graphqlschema.js')
const root = require('./reslover.js')

app.use('/',express.static(path.join(__dirname, 'client')));
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
  });


// Create an express server and a GraphQL endpoint

app.use('/graphql', expGraphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(3000,()=>{
    console.log("Server up and listening on 3000")
})