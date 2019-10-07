// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import { css } from 'styled-components';
import { animation } from './animations';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const emptyLoaderCSS = css`
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

export const cardCSS = css`
  padding: 4rem;
  background: var(--color-inverse);
  box-shadow: var(--border-box-shadow);
  border-radius: var(--border-radius);
`;

export const titleCSS = css`
  font-weight: 700;
  font-size: 4rem;
  line-height: 4rem;
`;

export const sidebarButtonCSS = css`
  display: flex;
  /* width: 50%; */
  justify-content: flex-start;
  padding: 1.5rem 2rem;
  font-size: 1.75rem;
`;
