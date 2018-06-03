const express = require('express')
const priv = require('dotenv').config()
const path = require('path')
const expGraphql = require('express-graphql')


const app=express()
const db = require('./models/db.js')
const pins = require('./models/pins.js')
const schema = require('./models/graphqlschema.js')

app.use('/',express.static(path.join(__dirname, 'client')));
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
  });

// Root resolver
const root = {
    allPins: () => {
        return pins.find({},(err,results)=>{
            return (results)
        })
    },
    singlePin: (args)=>{
        return pins.findById(args.id,(err,result)=>{
            return result
        })
    }
};
// Create an express server and a GraphQL endpoint

app.use('/graphql', expGraphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(3000,()=>{
    console.log("Server up and listening on 3000")
})