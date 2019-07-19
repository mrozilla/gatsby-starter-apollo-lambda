// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import styled from 'styled-components';

// ─────────────────────────────────────────────────────────────────────────────
// table
// ─────────────────────────────────────────────────────────────────────────────

const NativeTable = styled.table`
  width: 100%;
  white-space: pre;
`;

export function Table({ children, ...rest }) {
  return (
    <div
      css={`
        overflow-x: auto;
      `}
    >
      <NativeTable {...rest}>{children}</NativeTable>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// thead
// ─────────────────────────────────────────────────────────────────────────────

Table.Thead = styled.thead`
  --shadow: 0 2px 0 0 hsla(var(--hsl-text), 0.1);

  box-shadow: var(--shadow);
  & th {
    padding: 1rem 0.5rem;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// tbody
// ─────────────────────────────────────────────────────────────────────────────

Table.Tbody = styled.tbody`
  & tr:hover {
    background-color: hsla(var(--hsl-text), 0.05);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// tfoot
// ─────────────────────────────────────────────────────────────────────────────

Table.Tfoot = styled.tfoot``;

// ─────────────────────────────────────────────────────────────────────────────
// tr
// ─────────────────────────────────────────────────────────────────────────────

Table.Tr = styled.tr`
  --shadow: 0 2px 0 0 hsla(var(--hsl-text), 0.05);

  box-shadow: var(--shadow);
`;

// ─────────────────────────────────────────────────────────────────────────────
// th
// ─────────────────────────────────────────────────────────────────────────────

Table.Th = styled.th``;

// ─────────────────────────────────────────────────────────────────────────────
// td
// ─────────────────────────────────────────────────────────────────────────────

Table.Td = styled.td`
  padding: 0.5rem;
`;
