// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { string } from 'prop-types';

import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import { Form, Input, H1, Button, Link, Section, P } from '~components';
import { cardCSS } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function PasswordResetContainer({ token }) {
  const [password, setPassword] = useState(__DEV__ ? '43214321' : '');
  const { t } = useTranslation();

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
          {t('passwordReset.failure.title')}
        </H1>
        <P>
          <Link
            to="/u/forgot/"
            look="primary"
            css={`
              font-weight: 700;
            `}
          >
            {t('passwordReset.failure.link')}
          </Link>
        </P>
      </Section>
    );
  }

  if (data.resetPassword) {
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
          {t('passwordReset.success.title')}
        </H1>
        <P>
          <Link
            to="/u/login/"
            look="primary"
            css={`
              font-weight: 700;
            `}
          >
            {t('passwordReset.success.link')}
          </Link>
        </P>
      </Section>
    );
  }

  return (
    <Form
      css={`
        ${cardCSS}
        grid-column: 2;
        margin: 2rem 0;

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
        {t('passwordReset.form.title')}
      </H1>
      <Input
        type="password"
        name="password"
        label={t('passwordReset.form.input.password.label')}
        placeholder={t('passwordReset.form.input.password.placeholder')}
        error={t('passwordReset.form.input.password.error')}
        pattern="^\S{8,}$"
        required
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <Button
        type="submit"
        look="primary"
        disabled={loading || password.length < 8}
        css={`
          grid-area: button;
        `}
      >
        {t('passwordReset.form.button.submit')}
      </Button>
    </Form>
  );
}

PasswordResetContainer.propTypes = {
  token: string.isRequired,
};
