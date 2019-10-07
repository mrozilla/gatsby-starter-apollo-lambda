// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { useTranslation } from 'react-i18next';

import { RootContainer, LoginContainer, FooterContainer } from '~containers';
import { Main, Section, P, Link, Text, Logo } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function LoginScreen() {
  const { t } = useTranslation();
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
              {t('login.links.reset.intro')}{' '}
            </Text>
            <Link to="/u/forgot/" look="secondary">
              {t('login.links.reset.link')}
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
              {t('login.links.signup.intro')}{' '}
            </Text>
            <Link to="/u/signup/" look="secondary">
              {t('login.links.signup.link')}
            </Link>
          </P>
        </Section>
      </Main>
      <FooterContainer />
    </RootContainer>
  );
}
