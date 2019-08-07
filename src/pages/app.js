// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Router } from '@reach/router';

import { SignupScreen,
  LoginScreen,
  PasswordForgotScreen,
  PasswordResetScreen,
  AccountDeleteScreen,
  HomeScreen } from '../screens';

// ─────────────────────────────────────────────────────────────────────────────
// graphql
// ─────────────────────────────────────────────────────────────────────────────

const client = new ApolloClient({
  uri:     '/.netlify/functions/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        {/* <Redirect from="/" to="/u/signup/" /> */}
        <HomeScreen path="/u/" />
        <SignupScreen path="/u/signup/" />
        <LoginScreen path="/u/login/" />
        <PasswordForgotScreen path="/u/forgot/" />
        <PasswordResetScreen path="/u/reset/" />
        <AccountDeleteScreen path="/u/delete/" />
      </Router>
    </ApolloProvider>
  );
}
