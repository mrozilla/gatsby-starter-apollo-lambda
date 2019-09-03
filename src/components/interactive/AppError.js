// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { useTranslation } from 'react-i18next';
import { shape, string, number } from 'prop-types';

import { Alert } from '~components/text/Alert';
import Icon from '~components/multimedia/Icon';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function AppError({ error, errorMessages, ...rest }) {
  const { t } = useTranslation();

  if (!error) return null;

  const renderErrorMessage = () => {
    // server errors
    if (error.networkError?.statusCode >= 500) {
      return t('error.500', { statusCode: error.networkError.statusCode });
    }

    // input errors
    if (error.networkError?.statusCode >= 400) {
      if (error.networkError?.result?.errors) {
        return errorMessages[error.networkError.statusCode] || t('error.default');
      }
    }

    // server errors
    if (error.graphQLErrors.length > 0) {
      return error.graphQLErrors.map(err => t(`error.${err.message}`)).join(', ');
    }

    // catch-all defaults
    if (error.message === 'GraphQL error: ') {
      return t('error.default');
    }

    return error.message;
  };

  return (
    <Alert look="danger" {...rest}>
      <Icon
        icon="FaExclamationTriangle"
        css={`
          flex: 0 0 2rem;
          margin: 0.25em 1rem 0 0;
        `}
      />
      {renderErrorMessage()}
    </Alert>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// proptypes
// ─────────────────────────────────────────────────────────────────────────────

AppError.propTypes = {
  error: shape({
    networkError: shape({
      statusCode: number.isRequired,
    }),
  }),
  errorMessages: shape({
    400: string.isRequired,
  }),
};
AppError.defaultProps = {
  error:         null,
  errorMessages: {
    400: '',
  },
};
