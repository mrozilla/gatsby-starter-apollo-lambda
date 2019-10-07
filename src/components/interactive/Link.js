// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { string, node } from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import styled, { css } from 'styled-components';

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

const StyledLink = styled.a`
  --color: var(--color-primary);

  outline: none;

  transition: all 250ms;

  ${({ look }) => {
    if (look === 'primary') {
      return css`
        color: var(--color);
        text-decoration: underline;
        text-decoration-color: var(--color);
      `;
    }
    if (look === 'secondary') {
      return css`
        color: var(--color);
        &:hover,
        &:focus,
        &:active {
          text-decoration: underline;
          text-decoration-color: var(--color);
        }
      `;
    }
    if (look === 'tertiary') {
      return css`
        &:hover,
        &:focus,
        &:active {
          color: var(--color);
          text-decoration: underline;
          text-decoration-color: var(--color);
        }
      `;
    }

    return null;
  }};
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function Link({ href, to, children, ...rest }) {
  const link = href || to || '';

  if (['http', 'mailto:', 'tel:', 'www.'].some((t) => link.includes(t))) {
    const externalLink = link.startsWith('www.') ? `https://${link}` : link;
    return (
      <StyledLink
        as={OutboundLink}
        href={externalLink}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </StyledLink>
    );
  }
  return (
    <StyledLink as={GatsbyLink} to={link} {...rest}>
      {children}
    </StyledLink>
  );
}

Link.propTypes = {
  children: node.isRequired,
  href:     string,
  to:       string,
};
Link.defaultProps = {
  href: null,
  to:   null,
};
