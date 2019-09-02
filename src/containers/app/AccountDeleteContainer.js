// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { Form, Section, H1, P, Button, Input, Link, Text, AppError } from '~components';
import { cardCSS } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function AccountDeleteContainer() {
  const [email, setEmail] = useState(__DEV__ ? 'jan@mrozilla.cz' : '');

  const [mutate, { loading, error, data = {} }] = useMutation(gql`
    mutation($email: Email!) {
      delete(email: $email)
    }
  `);

  const client = useApolloClient();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await mutate({ variables: { email } });
      client.clearStore();
      localStorage.removeItem('token');
    } catch (err) {
      console.warn({ ...err }); // eslint-disable-line no-console
    }
  };

  if (data.delete) {
    return (
      <Section
        css={`
          ${cardCSS}
          grid-column: 2;
          margin: 2rem 0;
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
          Your account has been deleted
        </H1>
        <Link to={__DEV__ ? '/u/login/' : '/'} look="primary">
          Back to homepage
        </Link>
      </Section>
    );
  }

  return (
    <>
      <Form
        css={`
          ${cardCSS}
          grid-column: 2;
          margin: 2rem 0;

          grid-template:
            'title'
            'description'
            'email'
            'button';
        `}
        onSubmit={handleSubmit}
      >
        <H1
          css={`
            grid-area: title;

            font-weight: 700;
            font-size: 2.5rem;
          `}
        >
          Are you sure you want permanently to delete your account?
        </H1>
        <P
          css={`
            margin: 0 0 2rem;
          `}
        >
          All your data will be deleted. You will not be able to undo this action. Please type in
          your email to confirm:
        </P>
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Email"
          error="Your email has to be in the format of name@domain.com"
          required
          autoFocus={!__DEV__}
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <Button
          type="submit"
          look="primary"
          disabled={loading || email === ''}
          loading={loading}
          css={`
            grid-area: button;
            background: var(--color-danger);
          `}
        >
          Delete account
        </Button>
        <AppError
          error={error}
          errorMessages={{
            400: 'Fill in the email field',
          }}
        />
      </Form>
      <P
        css={`
          font-size: 1.5rem;
          line-height: 2rem;
          padding: 0 4rem;
        `}
      >
        <Text
          css={`
            opacity: 0.5;
          `}
        >
          Want to keep your account?{' '}
        </Text>
        <Link to="/u/settings/" look="secondary">
          Go back
        </Link>
      </P>
    </>
  );
}
