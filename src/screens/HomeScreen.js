// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';

import { RootContainer, AppHeaderContainer } from '~containers';
import { Main, Section, H1 } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  return (
    <RootContainer>
      <AppHeaderContainer />
      <Main>
        <Section
          css={`
            padding: 10vw var(--width-outside);
          `}
        >
          <H1>Home screen</H1>
        </Section>
      </Main>
    </RootContainer>
  );
}
