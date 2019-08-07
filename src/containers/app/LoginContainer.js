// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { navigate } from '@reach/router';

import { Form, Input, H1, Button, Alert } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function LoginContainer() {
  const [inputs, setInputs] = useState({
    usernameOrEmail: __DEV__ ? 'mrozilla' : '',
    password:        __DEV__ ? '12341234' : '',
  });

  const [mutate, { loading, error }] = useMutation(gql`
    mutation($inputs: LoginInput!) {
      login(loginData: $inputs)
    }
  `);

  const handleInput = ({ target }) => setInputs(prev => ({ ...prev, [target.name]: target.value }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await mutate({ variables: { inputs } });
      localStorage.setItem('token', data.login);
      navigate('/u/');
    } catch (err) {
      console.warn({ ...err }); // eslint-disable-line no-console
    }
  };

  return (
    <Form
      css={`
        grid-column: 2;
        padding: 4rem;
        margin: 2rem 0;
        background-color: var(--color-inverse);
        box-shadow: var(--border-box-shadow);
        border-radius: var(--border-radius);

        grid-template:
          'title'
          'usernameOrEmail'
          'password'
          'button';
      `}
      onSubmit={handleSubmit}
    >
      <H1
        css={`
          grid-area: title;

          font-weight: 700;
          font-size: 2.5rem;
          margin: 0 0 2rem;
        `}
      >
        Log in to your account
      </H1>
      <Input
        type="text"
        name="usernameOrEmail"
        label="Username or email"
        placeholder="Username or email..."
        error="Your username or email is required"
        required
        value={inputs.usernameOrEmail}
        onChange={handleInput}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="Password..."
        pattern="^\S{8,}$"
        error="Your password has to be at least 8 characters long"
        required
        value={inputs.password}
        onChange={handleInput}
      />
      <Button
        type="submit"
        look="primary"
        disabled={loading}
        css={`
          grid-area: button;
          cursor: ${loading ? 'wait' : 'pointer'} !important;
        `}
      >
        {loading ? 'Loading...' : 'Log in'}
      </Button>
      {error && (
        <Alert
          type="danger"
          css={`
            grid-column: 1 / -1;
            margin: 2rem 0 0;
            font-weight: 700;
          `}
        >
          {error.graphQLErrors.map(err => err.message).join(', ')}
        </Alert>
      )}
    </Form>
  );
}
