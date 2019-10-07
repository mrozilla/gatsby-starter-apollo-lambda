// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { useTranslation } from 'react-i18next';
import { navigate } from '@reach/router';

import { RootContainer, AppHeaderContainer, AccountInformationContainer } from '~containers';
import { Main, Section, H1, H2, Button } from '~components';
import { cardCSS, titleCSS } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function SettingsScreen() {
  const { t } = useTranslation();
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
              ${titleCSS}
            `}
          >
            {t('settings.menu.title')}
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
              {t('settings.danger.title')}
            </H2>
            <Button
              look="secondary"
              css={`
                --color: var(--hsl-danger);
              `}
              onClick={() => navigate('/u/delete/')}
            >
              {t('delete.button')}
            </Button>
          </Section>
        </Section>
      </Main>
    </RootContainer>
  );
}
