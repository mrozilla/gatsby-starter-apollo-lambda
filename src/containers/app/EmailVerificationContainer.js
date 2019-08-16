// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from 'react';
import { string } from 'prop-types';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import { H1, Button, Link, Section, P } from '~components';
import { cardCSS } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

function RequestEmailVerificationContainer() {
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
          Check your email!
        </H1>
        <P>We have sent you an email with a verification link.</P>
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
        Your email verification link has expired
      </H1>
      <Button look="primary" disabled={loading} onClick={handleSendEmailVerification}>
        {loading ? 'Loading...' : 'Send link again'}
      </Button>
    </>
  );
}

export default function EmailVerificationContainer({ token }) {
  const [verifyEmail, { error, data = {} }] = useMutation(gql`
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
    if (token) asyncMutate();
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
          Your email has been successfully verified
        </H1>
        <P>
          <Link
            to="/u/"
            look="primary"
            css={`
              font-weight: 700;
            `}
          >
            Go back
          </Link>{' '}
          to your account
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
      <H1
        css={`
          font-weight: 700;
          font-size: 2.5rem;
        `}
      >
        Loading...
      </H1>
    </Section>
  );
}

EmailVerificationContainer.propTypes = {
  token: string.isRequired,
};
