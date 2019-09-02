// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import { Form, Input, H1, Button, Link, Section, P, Text, AppError } from '~components';
import { cardCSS } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function PasswordForgotContainer() {
  const [email, setEmail] = useState(__DEV__ ? 'jan@mrozilla.cz' : '');

  const [mutate, { loading, error, data = {} }] = useMutation(gql`
    mutation($email: Email!) {
      requestPasswordReset(email: $email)
    }
  `);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await mutate({ variables: { email } });
    } catch (err) {
      console.warn({ ...err }); // eslint-disable-line no-console
    }
  };

  if (data.requestPasswordReset) {
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
          Check your email!
        </H1>
        <P>We have sent an email to {email} with a link to reset your password.</P>
        {__DEV__ && data.requestPasswordReset && (
          <Link to={`/u/reset/?token=${data.requestPasswordReset}`} look="primary">
            [DEV] Skip email
          </Link>
        )}
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
            margin: 0 0 2rem;
          `}
        >
          Enter your email address and we’ll send you a link to reset your password.
        </H1>
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Email"
          error="Your email has to be in the format of name@domain.com"
          required
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
          `}
        >
          Send password reset link
        </Button>
        <AppError
          error={error}
          errorMessages={{
            400: 'Fill in your email',
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
          Remembered?{' '}
        </Text>
        <Link to="/u/login/" look="secondary">
          Back to login
        </Link>
      </P>
    </>
  );
}
