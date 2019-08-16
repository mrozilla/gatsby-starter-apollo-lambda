// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { navigate } from '@reach/router';

import { Header, Nav, Link, Logo } from '~components';
import LogoutContainer from './LogoutContainer';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function AppHeaderContainer() {
  const { error, data = {} } = useQuery(gql`
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
    <Header>
      <Nav>
        <Link
          to="/u/"
          css={`
            padding: 3.5rem 0;
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
        <Nav.List />
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
                  Settings
                </Link>
              </Nav.List.Item>
              <Nav.List.Item>
                <LogoutContainer />
              </Nav.List.Item>
            </Nav.List>
          </Nav.List.Item>
        )}
      </Nav>
    </Header>
  );
}
