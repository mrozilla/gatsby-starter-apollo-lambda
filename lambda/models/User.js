// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

const { gql, AuthenticationError } = require('apollo-server-lambda');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
        trim:     true,
      },
      password: {
        type:     String,
        required: true,
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
    email: String!
    password: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input SignupInput {
    firstName: String
    lastName: String
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    usernameOrEmail: String!
    password: String!
  }

  extend type Mutation {
    signup(signupData: SignupInput!): String!
    login(loginData: LoginInput!): String!
    requestPasswordReset(email: String!): String!
    resetPassword(token: String!, password: String!): Boolean!
    delete(email: String!): Boolean!
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
        const user = await models.User.create({
          ...signupData,
          password: await bcrypt.hash(signupData.password, 10),
        });

        const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXP,
        });
        return token;
      } catch (error) {
        if (error.code === 11000) throw new AuthenticationError('Username already taken'); // check if DB-specific error
        throw error;
      }
    },

    login: async (_, { loginData: { usernameOrEmail, password } }, { models }) => {
      const user = await models.User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });
      if (!user) throw new AuthenticationError('Invalid password or email');

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new AuthenticationError('Invalid password or email');

      const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP,
      });
      return token;
    },

    requestPasswordReset: async (_, { email }, { models }) => {
      const user = await models.User.findOne({ email });
      if (!user) throw new Error("User doesn't exist");

      const token = jwt.sign({ email, oldPassword: user.password }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      }); // old password hash intentionally part of the JWT hash

      try {
        const msg = {
          to:                    email,
          from:                  'test@example.com',
          templateId:            'd-9ae88a5e9d524d078e059f58ad1b4d3f',
          dynamic_template_data: {
            link: `http://localhost:8000/u/reset/?token=${token}`,
          },
        };
        sgMail.send(msg);
      } catch (error) {
        throw new Error("Email wasn't sent");
      }

      return token;
    },

    resetPassword: async (_, { token, password }, { models }) => {
      try {
        const { email, oldPassword } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await models.User.updateOne(
          { email, password: oldPassword },
          { password: await bcrypt.hash(password, 10) },
        );
        if (!user) throw new Error(); // intentionally empty, caught in catch block

        return true;
      } catch (error) {
        throw new Error('Password reset link has expired');
      }
    },

    delete: async (_, { email }, { me, models }) => {
      try {
        const { n, deletedCount } = await models.User.deleteOne({
          $and: [{ _id: me._id }, { email }],
        });
        if (n !== 1 || deletedCount !== 1) throw new Error(); // intentionally empty, caught in catch block

        return true;
      } catch (error) {
        throw new Error("User account wasn't removed");
      }
    },
  },
};
