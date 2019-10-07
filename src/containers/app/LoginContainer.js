// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { navigate } from '@reach/router';

import { Form, Input, H1, Button, AppError } from '~components';
import { cardCSS } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function LoginContainer() {
  const [inputs, setInputs] = useState({
    usernameOrEmail: __DEV__ ? 'mrozilla' : '',
    password:        __DEV__ ? '12341234' : '', // 12341234
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
        ${cardCSS}
        grid-column: 2;
        margin: 2rem 0;

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
        autoFocus
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
        disabled={loading || Object.values(inputs).some(input => input === '')}
        loading={!!loading}
        css={`
          grid-area: button;
        `}
      >
        Log in
      </Button>
      <AppError
        error={error}
        errorMessages={{
          400: 'Fill in both username/email and password fields',
        }}
      />
    </Form>
  );
}
