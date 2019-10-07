// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { gql } from 'apollo-boost';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { Form, Section, H1, P, Button, Input, Link, Text, AppError } from '~components';
import { cardCSS } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function AccountDeleteContainer() {
  const [email, setEmail] = useState(__DEV__ ? 'jan@mrozilla.cz' : '');
  const { t } = useTranslation();

  const client = useApolloClient();
  const [mutate, { loading, error, data = {} }] = useMutation(gql`
    mutation($email: Email!) {
      removeUser(email: $email)
    }
  `);

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

  if (data.removeUser) {
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
          {t('delete.success.title')}
        </H1>
        <Link to={__DEV__ ? '/u/login/' : '/'} look="primary">
          {t('delete.success.link')}
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
          {t('delete.form.title')}
        </H1>
        <P
          css={`
            margin: 0 0 2rem;
          `}
        >
          {t('delete.form.description')}
        </P>
        <Input
          type="email"
          name="email"
          label={t('delete.form.input.email.label')}
          placeholder={t('delete.form.input.email.placeholder')}
          error={t('delete.form.input.email.error')}
          autoFocus={!__DEV__}
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
            background: var(--color-danger);
          `}
        >
          {t('delete.form.button.submit')}
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
          {t('delete.links.back.intro')}{' '}
        </Text>
        <Link to="/u/settings/" look="secondary">
          {t('delete.links.back.link')}
        </Link>
      </P>
    </>
  );
}
