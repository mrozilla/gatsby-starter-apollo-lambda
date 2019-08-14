// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

require('dotenv').config({ path: '.env.development' });

const { ApolloServer, gql } = require('apollo-server-lambda');
const mongoose = require('mongoose');

const User = require('./models/User');

const scalars = require('./utils/scalars');
const getUserFromJwt = require('./utils/getUserFromJwt');

// ─────────────────────────────────────────────────────────────────────────────
// mongoose
// ─────────────────────────────────────────────────────────────────────────────

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

// ─────────────────────────────────────────────────────────────────────────────
// root
// ─────────────────────────────────────────────────────────────────────────────

const rootTypeDefs = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

const rootResolvers = {
  Query: {
    _: () => false,
  },
  Mutation: {},
};

// ─────────────────────────────────────────────────────────────────────────────
// server
// ─────────────────────────────────────────────────────────────────────────────

const server = new ApolloServer({
  typeDefs:  [rootTypeDefs, User.typeDefs, scalars.typeDefs],
  resolvers: [rootResolvers, User.resolvers, scalars.resolvers],
  context:   ({ event }) => {
    const user = getUserFromJwt(event);
    return {
      me:     user,
      models: { User: User.Model },
    };
  },
});

exports.handler = server.createHandler();
