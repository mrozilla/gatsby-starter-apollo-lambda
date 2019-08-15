// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from 'react';
import { shape, string } from 'prop-types';
import { navigate } from '@reach/router';
import qs from 'query-string';

import { RootContainer, EmailVerificationContainer, FooterContainer } from '~containers';
import { Main, Section, Logo, Link } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function EmailVerificationScreen({ location }) {
  useEffect(() => {
    const { token } = qs.parse(location.search);
    if (token) {
      navigate('/u/verify/', { state: { token } }, { replace: true });
    }
  }, [location.search]);

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
          {location?.state?.token && <EmailVerificationContainer token={location?.state?.token} />}
        </Section>
      </Main>
      <FooterContainer />
    </RootContainer>
  );
}

EmailVerificationScreen.propTypes = {
  location: shape({
    search: string,
  }),
};

EmailVerificationScreen.defaultProps = {
  location: {
    search: undefined,
  },
};
