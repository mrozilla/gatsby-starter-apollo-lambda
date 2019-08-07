// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';

import { RootContainer, LoginContainer, FooterContainer } from '~containers';
import { Main, Section, P, Link, Text, Logo } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function LoginScreen() {
  return (
    <RootContainer>
      <Main
        css={`
          grid-template-columns: var(--width-outside) minmax(40rem, 50rem) var(--width-outside);
          justify-content: center;
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
              `}
            />
          </Link>
          <LoginContainer />
          <P
            css={`
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
              Can&apos;t remember?{' '}
            </Text>
            <Link to="/u/forgot/" look="secondary">
              Reset your password
            </Link>
          </P>
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
              Don&apos;t have an an account yet?{' '}
            </Text>
            <Link to="/u/signup/" look="secondary">
              Sign up
            </Link>
          </P>
        </Section>
      </Main>
      <FooterContainer />
    </RootContainer>
  );
}
