// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { shape, string } from 'prop-types';
import { navigate } from '@reach/router';
import qs from 'query-string';

import { RootContainer, PasswordResetContainer, FooterContainer } from '~containers';
import { Main, Section, Logo, Link } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function PasswordResetScreen({ location }) {
  const { token } = qs.parse(location.search);
  if (token) {
    navigate('/u/reset/', { state: { token } }, { replace: true });
  }

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
          <PasswordResetContainer token={location?.state?.token} />
        </Section>
      </Main>
      <FooterContainer />
    </RootContainer>
  );
}

PasswordResetScreen.propTypes = {
  location: shape({
    search: string,
  }),
};

PasswordResetScreen.defaultProps = {
  location: {
    search: undefined,
  },
};
