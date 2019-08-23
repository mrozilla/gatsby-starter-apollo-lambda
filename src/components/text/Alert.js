// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled, { css } from 'styled-components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

// prettier-ignore
export const Alert = styled.span`
  display: inline-block;
  line-height: 3rem;
  padding: 1rem;
  box-shadow: 0 0 0 2px;
  border-radius: 0.25rem;

  ${({ type }) => type
    && css`
      background: hsla(var(--hsl-${type}), 0.05);
      color: var(--color-${type});
    `};
`;
