// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

require('dotenv').config({ path: '.env.development' });

const { ApolloServer, gql } = require('apollo-server-lambda');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('./models/User');
const DateTime = require('./models/DateTime');

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
// helpers
// ─────────────────────────────────────────────────────────────────────────────

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET);
    }
    return null;
  } catch (err) {
    return null;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// server
// ─────────────────────────────────────────────────────────────────────────────

const server = new ApolloServer({
  typeDefs:  [rootTypeDefs, User.typeDefs, DateTime.typeDefs],
  resolvers: [rootResolvers, User.resolvers, DateTime.resolvers],
  context:   ({ event }) => {
    const tokenWithBearer = event.headers.authorization || '';
    const [, token] = tokenWithBearer.split(' ');
    const user = getUser(token);
    return {
      me:     user,
      models: { User: User.Model },
    };
  },
});

exports.handler = server.createHandler();
