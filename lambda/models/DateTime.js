// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

const { gql } = require('apollo-server-lambda');
const { DateTimeResolver } = require('graphql-scalars');

// ─────────────────────────────────────────────────────────────────────────────
// typeDefs
// ─────────────────────────────────────────────────────────────────────────────

exports.typeDefs = gql`
  scalar DateTime
`;

// ─────────────────────────────────────────────────────────────────────────────
// resolvers
// ─────────────────────────────────────────────────────────────────────────────

exports.resolvers = {
  DateTime: DateTimeResolver,
};
