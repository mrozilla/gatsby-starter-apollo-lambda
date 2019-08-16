// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import { css } from 'styled-components';
import { animation } from './animations';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const emptyLoader = css`
  &:empty {
    background: linear-gradient(
      to right,
      hsla(var(--hsl-text), 0.1) 40%,
      hsla(var(--hsl-text), 0.2),
      hsla(var(--hsl-text), 0.1) 60%
    );
    height: 1em;
    width: 8em;
    border-radius: 0.5rem;

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
