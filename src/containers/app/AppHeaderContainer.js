// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { navigate } from '@reach/router';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import DarkModeContainer from '~containers/general/DarkModeContainer';
import LogoutContainer from '~containers/app/LogoutContainer';
import { Header, Nav, Link, Logo, TextLoader } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function AppHeaderContainer() {
  const { t } = useTranslation();
  const { loading, error, data = {} } = useQuery(gql`
    query {
      me {
        username
      }
    }
  `);

  useEffect(() => {
    if (error) {
      navigate('/u/login/');
    }
  }, [error]);

  return (
    <Header
      css={`
        position: sticky;
        z-index: var(--z-index-header);
        top: 0;
        width: 100%;
        max-height: 100vh;

        background: var(--color-inverse);
        box-shadow: inset 0 -2px hsla(var(--hsl-text), 0.05);

        padding: 0 var(--width-outside);
      `}
    >
      <Nav>
        <Link
          to="/u/"
          css={`
            padding: 2rem 0;
            display: flex;
            align-items: center;
          `}
        >
          <Logo />
        </Link>
        <Nav.Toggle
          css={`
            top: 2.5rem;
            right: -2rem;
          `}
        />
        <Nav.List
          css={`
            justify-self: end;
          `}
        >
          {loading && (
            <Nav.List.Item>
              <TextLoader>Username</TextLoader>
            </Nav.List.Item>
          )}
          {data?.me && (
            <Nav.List.Item>
              {data?.me?.username}
              <Nav.Toggle
                css={`
                  top: -1rem;
                  right: -2rem;
                `}
              />
              <Nav.List>
                <Nav.List.Item>
                  <Link
                    to="/u/settings/"
                    css={`
                      display: block;
                      padding: 1rem;

                      @media screen and (min-width: 1200px) {
                        padding: 1rem 4rem;
                      }
                    `}
                  >
                    {t('settings.menu.title')}
                  </Link>
                </Nav.List.Item>
                <Nav.List.Item>
                  <LogoutContainer />
                </Nav.List.Item>
              </Nav.List>
            </Nav.List.Item>
          )}
          <Nav.List.Item>
            <DarkModeContainer
              css={`
                padding: 1rem 0 1rem 2rem;
              `}
            />
          </Nav.List.Item>
        </Nav.List>
      </Nav>
    </Header>
  );
}
