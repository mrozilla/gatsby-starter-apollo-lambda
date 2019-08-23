// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled, { css } from 'styled-components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const Button = styled.button`
  -webkit-appearance: none;
  border: none;
  outline: none;
  background: transparent;
  text-decoration: none !important; /* reset link buttons styling */

  display: inline-block;
  padding: 1.5rem 4rem;

  font-weight: 700;
  text-align: center;
  line-height: 2rem;
  border-radius: 0.5rem;
  cursor: pointer;

  transition: all 250ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:not(:disabled):hover,
  &:not(:disabled):focus {
    transform: translateY(-2px);
  }
  &:not(:disabled):active {
    transform: translateY(1px);
  }

  ${({ look }) => {
    if (look === 'primary') {
      return css`
        background: var(--gradient-brand);
        color: var(--color-inverse) !important;

        &:not(:disabled):hover,
        &:not(:disabled):focus {
          box-shadow: 0 0.5rem 0.5rem hsla(var(--hsl-text), 0.1);
        }
      `;
    }

    if (look === 'primary-inverse') {
      return css`
        background: var(--color-inverse);
        color: var(--color-brand-primary);
      `;
    }

    if (look === 'secondary') {
      return css`
        --color: var(--hsl-brand-primary);

        box-shadow: inset 0 0 0 2px hsla(var(--color), 1);
        color: hsla(var(--color), 1);

        &:not(:disabled):hover,
        &:not(:disabled):focus {
          background: hsla(var(--color), 0.1);
          box-shadow: inset 0 0 0 2px hsla(var(--color), 1),
            0 0.5rem 0.5rem hsla(var(--hsl-text), 0.1);
        }
      `;
    }

    if (look === 'secondary-inverse') {
      return css`
        box-shadow: inset 0 0 0 2px var(--color-inverse);
        color: var(--color-inverse);

        &:not(:disabled):hover,
        &:not(:disabled):focus {
          color: var(--color-inverse);
        }
      `;
    }

    if (look === 'tertiary') {
      return css`
        &:not(:disabled):hover,
        &:not(:disabled):focus {
          color: var(--color-brand-primary);
        }
      `;
    }

    if (look === 'tertiary-inverse') {
      return css`
        color: var(--color-inverse);

        &:not(:disabled):hover,
        &:not(:disabled):focus {
          color: var(--color-brand-primary);
        }
      `;
    }

    return null;
  }};

  ${({ grouped }) => grouped
    && css`
      &:not(:last-of-type) {
        margin: 0 0 1rem;
        @media screen and (min-width: 600px) {
          margin: 0 1rem 0 0;
        }
      }
    `};
`;
