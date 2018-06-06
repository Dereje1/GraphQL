const { buildSchema } = require('graphql')

const schema = buildSchema(`
    type Query {
        allPins: [Pin!]!
        singlePin(id: String): Pin
    },
    type Mutation {
        addPin(owner:String!, imgDescription:String!, imgLink:String!): Pin!
        updatePin(id:String!, savedBy:[String!]!): Pin!
        deletePin(id:String!): String
    }
    type Pin{
        id: String!
        owner: String!
        imgDescription:String!
        imgLink:String!
        timeStamp: String!
        savedBy: [String]!
    }
`);

module.exports= schema