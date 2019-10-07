// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';

import { animation } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const TextLoader = styled.span`
  display: table; /* allow inline-layout with line-breaks */
  position: relative;

  color: transparent;
  letter-spacing: 0.5em;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0.125em;
    width: 100%;
    height: calc(100% - 0.25em);
    background: linear-gradient(
      to right,
      hsla(var(--hsl-text), 0.1) 40%,
      hsla(var(--hsl-text), 0.15),
      hsla(var(--hsl-text), 0.1) 60%
    );

    background-size: 200% 100%;
    background-position: -100% 0;

    animation: ${animation({
    from: {
      backgroundPosition: '100% 0',
    },
    properties: '2s linear infinite',
  })};
  }
`;
