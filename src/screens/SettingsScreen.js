// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';

import { RootContainer, AppHeaderContainer, AccountInformationContainer } from '~containers';
import { Main, Section, H1, H2, Link, Button } from '~components';
import { cardCSS } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function SettingsScreen() {
  return (
    <RootContainer>
      <AppHeaderContainer />
      <Main
        css={`
          padding: 10vw var(--width-outside);

          display: grid;
          grid-template: 'menu content' / 1fr 3fr;
        `}
      >
        <Section
          css={`
            grid-area: menu;
          `}
        >
          <H1
            css={`
              font-weight: 700;
              font-size: 4rem;
              line-height: 4rem;
              margin: 0 0 2rem;
            `}
          >
            Settings
          </H1>
        </Section>
        <Section
          css={`
            grid-area: content;
          `}
        >
          <AccountInformationContainer />
          <Section
            css={`
              ${cardCSS}
            `}
          >
            <H2
              css={`
                font-weight: 700;
                font-size: 3rem;
                line-height: 4rem;
                margin: 0 0 2rem;
              `}
            >
              Danger zone
            </H2>
            <Button
              as={Link}
              to="/u/delete/"
              look="secondary"
              css={`
                --color: var(--hsl-danger);
              `}
            >
              Delete account
            </Button>
          </Section>
        </Section>
      </Main>
    </RootContainer>
  );
}
