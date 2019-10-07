// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Router } from '@reach/router';

import {
  SignupScreen,
  EmailVerificationScreen,
  LoginScreen,
  PasswordForgotScreen,
  PasswordResetScreen,
  AccountDeleteScreen,
  HomeScreen,
  SettingsScreen,
} from '../screens';

// ─────────────────────────────────────────────────────────────────────────────
// i18n
// ─────────────────────────────────────────────────────────────────────────────

import '~utils/i18n';

// ─────────────────────────────────────────────────────────────────────────────
// graphql
// ─────────────────────────────────────────────────────────────────────────────

const client = new ApolloClient({
  uri:     '/.netlify/functions/graphql',
  request: async (operation) => {
    if (__DEV__) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulates backend latency
    }

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
        <SignupScreen path="/u/signup/" />
        <EmailVerificationScreen path="/u/verify" />
        <LoginScreen path="/u/login/" />
        <PasswordForgotScreen path="/u/forgot/" />
        <PasswordResetScreen path="/u/reset/" />
        <AccountDeleteScreen path="/u/delete/" />

        <HomeScreen path="/u/" />
        <SettingsScreen path="/u/settings/" />
      </Router>
    </ApolloProvider>
  );
}
