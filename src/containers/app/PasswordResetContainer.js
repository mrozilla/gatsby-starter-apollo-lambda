// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { string } from 'prop-types';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import { Form, Input, H1, Button, Link, Section, P } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function PasswordResetContainer({ token }) {
  const [password, setPassword] = useState(__DEV__ ? '43214321' : '');

  const [mutate, { loading, error, data = {} }] = useMutation(gql`
    mutation($token: String!, $password: String!) {
      resetPassword(token: $token, password: $password)
    }
  `);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await mutate({ variables: { token, password } });
    } catch (err) {
      console.warn({ ...err }); // eslint-disable-line no-console
    }
  };

  if (error) {
    return (
      <Section
        css={`
          grid-column: 2;
          padding: 4rem;
          margin: 2rem 0;
          background-color: var(--color-inverse);
          box-shadow: var(--border-box-shadow);
          border-radius: var(--border-radius);
        `}
      >
        <H1
          css={`
            grid-area: title;

            font-weight: 700;
            font-size: 2.5rem;
            margin: 0 0 2rem;
          `}
        >
          Your password reset link has expired
        </H1>
        <P>
          <Link
            to="/u/forgot/"
            look="primary"
            css={`
              font-weight: 700;
            `}
          >
            Try again
          </Link>{' '}
          with a new link
        </P>
      </Section>
    );
  }

  if (data.resetPassword) {
    return (
      <Section
        css={`
          grid-column: 2;
          padding: 4rem;
          margin: 2rem 0;
          background-color: var(--color-inverse);
          box-shadow: var(--border-box-shadow);
          border-radius: var(--border-radius);
        `}
      >
        <H1
          css={`
            grid-area: title;

            font-weight: 700;
            font-size: 2.5rem;
            margin: 0 0 2rem;
          `}
        >
          Your password has been successfully reset
        </H1>
        <P>
          <Link
            to="/u/login/"
            look="primary"
            css={`
              font-weight: 700;
            `}
          >
            Log in
          </Link>{' '}
          to your account
        </P>
      </Section>
    );
  }

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
          'title title'
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
        Enter your new password
      </H1>
      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
        pattern="^\S{8,}$"
        error="Your password has to be at least 8 characters long"
        required
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <Button
        type="submit"
        look="primary"
        disabled={loading}
        css={`
          grid-area: button;
        `}
      >
        {loading ? 'Loading...' : 'Save new password'}
      </Button>
    </Form>
  );
}

PasswordResetContainer.propTypes = {
  token: string.isRequired,
};
