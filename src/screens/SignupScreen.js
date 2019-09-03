// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';

import { RootContainer, SignupContainer, FooterContainer } from '~containers';
import { Main, Section, P, Link, Text, Logo } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function SignupScreen() {
  return (
    <RootContainer>
      <Main
        css={`
          grid-template-columns: var(--width-outside) minmax(40rem, 50rem) var(--width-outside);
          justify-content: center;
          background: var(--gradient-brand);
        `}
      >
        <Section
          css={`
            grid-column: 2;
            padding: 15vw 0;
          `}
        >
          <Link to="/">
            <Logo
              css={`
                margin: 0 4rem;
                fill: var(--color-inverse);
              `}
            />
          </Link>
          <SignupContainer />
          <P
            css={`
              color: var(--color-inverse);
              font-size: 1.5rem;
              line-height: 2rem;
              padding: 0 4rem;
              margin: 0 0 0.5rem;
            `}
          >
            <Text
              css={`
                opacity: 0.5;
              `}
            >
              By creating an account, you agree to our{' '}
            </Text>
            <Link
              to="/legal/terms/"
              look="secondary"
              css={`
                --color: var(--color-inverse);
              `}
            >
              Terms of Service
            </Link>
          </P>
          <P
            css={`
              color: var(--color-inverse);
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
              Already have an account?{' '}
            </Text>
            <Link
              to="/u/login/"
              look="secondary"
              css={`
                --color: var(--color-inverse);
              `}
            >
              Log in
            </Link>
          </P>
        </Section>
      </Main>
      <FooterContainer />
    </RootContainer>
  );
}
