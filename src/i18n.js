import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // Load translations from files
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Initialize react-i18next
  .init({
    fallbackLng: 'en', // Default language
    debug: true, // Enable debugging (remove in production)
    interpolation: {
      escapeValue: false, // React already escapes content
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to the translation files
    },
  });

export default i18n;
