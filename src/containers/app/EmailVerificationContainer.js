// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { string } from 'prop-types';

import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import { H1, Button, Link, Section, P, Loader } from '~components';
import { cardCSS } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

function RequestEmailVerificationContainer() {
  const { t } = useTranslation();
  const [requestEmailVerification, { loading, data = {} }] = useMutation(gql`
    mutation {
      requestEmailVerification
    }
  `);

  const handleSendEmailVerification = async () => {
    try {
      await requestEmailVerification();
    } catch (err) {
      console.warn({ ...err }); // eslint-disable-line no-console
    }
  };

  if (data.requestEmailVerification) {
    return (
      <>
        <H1
          css={`
            grid-area: title;

            font-weight: 700;
            font-size: 2.5rem;
            margin: 0 0 2rem;
          `}
        >
          {t('emailVerify.sent.title')}
        </H1>
        <P>{t('emailVerify.sent.description')}</P>
      </>
    );
  }

  return (
    <>
      <H1
        css={`
          grid-area: title;

          font-weight: 700;
          font-size: 2.5rem;
          margin: 0 0 2rem;
        `}
      >
        {t('emailVerify.failure.title')}
      </H1>
      <Button
        look="primary"
        disabled={loading}
        loading={loading}
        onClick={handleSendEmailVerification}
      >
        {t('emailVerify.failure.button')}
      </Button>
    </>
  );
}

export default function EmailVerificationContainer({ token }) {
  const { t } = useTranslation();
  const [verifyEmail, { data = {}, error }] = useMutation(gql`
    mutation($token: String!) {
      verifyEmail(token: $token)
    }
  `);

  useEffect(() => {
    async function asyncMutate() {
      try {
        await verifyEmail({ variables: { token } });
      } catch (err) {
        console.warn({ ...err }); // eslint-disable-line no-console
      }
    }
    asyncMutate();
  }, [token]);

  if (error) {
    return (
      <Section
        css={`
          ${cardCSS}
          grid-column: 2;
          margin: 2rem 0;
        `}
      >
        <RequestEmailVerificationContainer />
      </Section>
    );
  }

  if (data.verifyEmail) {
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
          {t('emailVerify.success.title')}
        </H1>
        <P>
          <Link
            to="/u/"
            look="primary"
            css={`
              font-weight: 700;
            `}
          >
            {t('emailVerify.success.link')}
          </Link>
        </P>
      </Section>
    );
  }

  return (
    <Section
      css={`
        ${cardCSS}
        grid-column: 2;
        margin: 2rem 0;
      `}
    >
      <Loader
        css={`
          display: block;
          margin: 0 auto;
        `}
      />
    </Section>
  );
}

EmailVerificationContainer.propTypes = {
  token: string.isRequired,
};
