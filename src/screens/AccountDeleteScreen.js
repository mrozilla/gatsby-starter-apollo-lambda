// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';

import { RootContainer, AccountDeleteContainer, FooterContainer } from '~containers';
import { Main, Section, Link, Logo } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function AccountDeleteScreen() {
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
          <AccountDeleteContainer />
        </Section>
      </Main>
      <FooterContainer />
    </RootContainer>
  );
}
