// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { navigate } from '@reach/router';

import { Form, Input, H1, Button, Alert, Icon } from '~components';
import { cardCSS } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function SignupContainer() {
  const [inputs, setInputs] = useState({
    firstName: __DEV__ ? 'Jan' : '',
    lastName:  __DEV__ ? 'Hrubý' : '',
    email:     __DEV__ ? 'jan@mrozilla.cz' : '',
    username:  __DEV__ ? 'mrozilla' : '',
    password:  __DEV__ ? '12341234' : '',
  });

  const [mutate, { loading, error }] = useMutation(gql`
    mutation($inputs: SignupInput!) {
      signup(signupData: $inputs)
    }
  `);

  const handleInput = ({ target }) => setInputs(prev => ({ ...prev, [target.name]: target.value }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await mutate({ variables: { inputs } });
      localStorage.setItem('token', data.signup);
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
          'title title'
          'firstName lastName'
          'username username'
          'email email'
          'password password'
          'button button'
          / 1fr 1fr;
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
        Create your account
      </H1>
      <Input
        type="text"
        name="firstName"
        label="First name"
        placeholder="First name"
        error="Please add your given name"
        autoFocus={!__DEV__}
        value={inputs.firstName}
        onChange={handleInput}
      />
      <Input
        type="text"
        name="lastName"
        label="Last name"
        placeholder="Last name"
        error="Please add your family name"
        value={inputs.lastName}
        onChange={handleInput}
      />
      <Input
        type="text"
        name="username"
        label="Username"
        placeholder="Choose your username"
        pattern="^\w{4,}$"
        description="Your username has to be at least 4 characters long"
        error="Your username has to be at least 4 characters long"
        required
        value={inputs.username}
        onChange={handleInput}
      />
      <Input
        type="email"
        name="email"
        label="Email"
        placeholder="Email"
        error="Your email has to be in the format of name@domain.com"
        required
        value={inputs.email}
        onChange={handleInput}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
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
        {loading ? 'Loading...' : 'Sign up for free'}
      </Button>
      {error && (
        <Alert
          type="danger"
          css={`
            grid-column: 1 / -1;
            margin: 2rem 0 0;
            font-weight: 700;

            display: flex;
            align-items: center;
          `}
        >
          <Icon
            icon="FaExclamationTriangle"
            css={`
              margin: 0 1rem 0 0;
            `}
          />
          {error.graphQLErrors.map(err => err.message).join(', ')}
        </Alert>
      )}
    </Form>
  );
}
