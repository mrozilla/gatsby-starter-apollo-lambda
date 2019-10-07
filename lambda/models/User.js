// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

const { gql, AuthenticationError } = require('apollo-server-lambda');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const errors = require('../utils/errors');
const emails = require('../utils/emails');

// ─────────────────────────────────────────────────────────────────────────────
// mongoose
// ─────────────────────────────────────────────────────────────────────────────

exports.Model = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      firstName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
      },
      username: {
        type:     String,
        required: true,
        unique:   true, // used to generate user pages
        trim:     true,
      },
      email: {
        type:     String,
        required: true,
        unique:   true,
        trim:     true,
      },
      password: {
        type:     String,
        required: true,
      },
      isVerified: {
        type:    Boolean,
        default: false,
      },
    },
    { timestamps: true }, // adds createdAt and updatedAt automatic fields
  ),
);

// ─────────────────────────────────────────────────────────────────────────────
// typeDefs
// ─────────────────────────────────────────────────────────────────────────────

exports.typeDefs = gql`
  extend type Query {
    me: User
  }

  type User {
    _id: ID!
    firstName: String
    lastName: String
    username: String!
    email: Email!
    password: String!
    isVerified: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input SignupInput {
    firstName: String
    lastName: String
    username: String!
    email: Email!
    password: String!
  }

  input LoginInput {
    usernameOrEmail: String!
    password: String!
  }

  input AccountInput {
    _id: ID!
    firstName: String
    lastName: String
    username: String
    email: Email
    password: String
    newPassword: String
  }

  extend type Mutation {
    signup(signupData: SignupInput!): String!
    requestEmailVerification: Boolean!
    verifyEmail(token: String!): Boolean!
    login(loginData: LoginInput!): String!
    requestPasswordReset(email: Email!): String!
    resetPassword(token: String!, password: String!): Boolean!
    updateAccount(accountData: AccountInput!): User!
    delete(email: Email!): Boolean!
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// resolvers
// ─────────────────────────────────────────────────────────────────────────────

exports.resolvers = {
  Query: {
    me: (parent, args, { me, models }) => models.User.findOne({ _id: me._id }),
  },
  Mutation: {
    signup: async (_, { signupData }, { models }) => {
      try {
        const user = new models.User({
          ...signupData,
          password: await bcrypt.hash(signupData.password, 10),
        });
        await user.save();

        emails.sendEmailVerification({
          email: signupData.email,
          token: jwt.sign({ username: user.username, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
          }),
        });

        return jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXP,
        });
      } catch (error) {
        if (error.code === 11000) throw new AuthenticationError(errors.userExists); // check if DB-specific error
        throw error;
      }
    },

    requestEmailVerification: async (_, __, { me, models }) => {
      try {
        const user = await models.User.findOne({ _id: me._id });
        if (!user) throw new Error(errors.userNotExist);

        emails.sendEmailVerification({
          email: user.email,
          token: jwt.sign({ username: user.username, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
          }),
        });

        return true;
      } catch (error) {
        throw new Error(error.emailNotSent);
      }
    },

    verifyEmail: async (_, { token }, { models }) => {
      try {
        const { username, email } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await models.User.updateOne({ email, username }, { isVerified: true });
        if (!user) throw new Error(); // intentionally empty to catch JWT errors too

        return true;
      } catch (error) {
        throw new Error(errors.linkExpired);
      }
    },

    login: async (_, { loginData: { usernameOrEmail, password } }, { models }) => {
      const user = await models.User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });
      if (!user) throw new AuthenticationError(errors.invalidLogin);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new AuthenticationError(errors.invalidLogin);

      return jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP,
      });
    },

    requestPasswordReset: async (_, { email }, { models }) => {
      const user = await models.User.findOne({ email });
      if (!user) throw new Error(errors.userNotExist);

      const token = jwt.sign({ email, oldPassword: user.password }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      }); // old password hash intentionally part of the JWT hash

      emails.sendPasswordReset({ email, token });

      return token;
    },

    resetPassword: async (_, { token, password }, { models }) => {
      try {
        const { email, oldPassword } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await models.User.updateOne(
          { email, password: oldPassword },
          { password: await bcrypt.hash(password, 10) },
        );
        if (!user) throw new Error(); // intentionally empty to catch JWT errors too

        return true;
      } catch (error) {
        throw new Error(errors.linkExpired);
      }
    },

    updateAccount: async (_, { accountData: { newPassword, ...rest } }, { me, models }) => {
      const user = await models.User.findOne({ _id: me._id });
      if (!user) throw new Error(errors.userNotExist);

      const isPasswordValid = await bcrypt.compare(rest.password, user.password);
      if (!isPasswordValid) throw new AuthenticationError(errors.invalidLogin);

      try {
        await user.set({
          ...rest,
          password: newPassword ? await bcrypt.hash(newPassword, 10) : user.password,
        });
        await user.save();

        return user;
      } catch (error) {
        throw new Error(errors.changesNotSaved);
      }
    },

    delete: async (_, { email }, { me, models }) => {
      const user = await models.User.findOne({ _id: me._id, email });
      if (!user) throw new Error(errors.userNotExist);

      const removedUser = await user.remove();
      if (!removedUser) throw new Error(errors.userNotDeleted);

      return true;
    },
  },
};
