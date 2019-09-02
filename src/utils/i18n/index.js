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
    },
  });

export default i18n;
