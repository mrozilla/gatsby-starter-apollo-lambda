// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';

// ─────────────────────────────────────────────────────────────────────────────
// resources
// ─────────────────────────────────────────────────────────────────────────────

const resources = {
  en,
};

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    react: {
      useSuspense: false, // TODO: review with Suspence release
    },

    interpolation: {
      escapeValue: false, // react already safes from xss
      format:      (value, format, language) => {
        if (format === 'intlDate') {
          const formatter = new Intl.DateTimeFormat(language);
          return formatter.format(value);
        }
        if (format === 'intlCurrency') {
          const formatter = new Intl.NumberFormat(language, {
            style:    'currency',
            currency: value.currency,
          });
          return formatter.format(value.amount);
        }

        return value;
      },
    },
  });

export default i18n;
