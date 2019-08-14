// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

const { gql } = require('apollo-server-lambda');
const { DateTimeResolver, EmailAddressResolver } = require('graphql-scalars');

// ─────────────────────────────────────────────────────────────────────────────
// typeDefs
// ─────────────────────────────────────────────────────────────────────────────

exports.typeDefs = gql`
  scalar DateTime
  scalar Email
`;

// ─────────────────────────────────────────────────────────────────────────────
// resolvers
// ─────────────────────────────────────────────────────────────────────────────

exports.resolvers = {
  DateTime: DateTimeResolver,
  Email:    EmailAddressResolver,
};
