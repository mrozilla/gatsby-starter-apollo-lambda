// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import { animation } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const Loader = styled.div`
  --color: var(--hsl-brand-primary);

  width: 1em;
  height: 1em;

  border: 0.125em solid hsla(var(--color), 0.1);
  border-top-color: hsla(var(--color), 1);
  border-radius: 50%;

  animation: ${animation({
    to: {
      transform: 'rotate(360deg)',
    },
    properties: '1s infinite',
  })};
`;
