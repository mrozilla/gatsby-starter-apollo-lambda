// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { navigate } from '@reach/router';

import { Button } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function LogoutContainer() {
  const client = useApolloClient();

  const handleLogout = () => {
    client.clearStore();
    localStorage.removeItem('token');
    navigate(__DEV__ ? '/u/login/' : '/');
  };

  return (
    <Button
      css={`
        &:not(:disabled):hover {
          transform: translateY(0);
        }
      `}
      onClick={handleLogout}
    >
      Log out
    </Button>
  );
}
