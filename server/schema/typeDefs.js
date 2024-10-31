const { gql } = require('graphql-tag');

const typeDefs = gql`
    # Federation directives
    type Query {
        author(id: ID!): Author
        authors: [Author]
    }

    type Mutation {
        addAuthor(name: String!, age: Int!): Author
    }

    type Author {
        id: ID!
        name: String!
        age: Int!
    }
`;

module.exports = typeDefs;
