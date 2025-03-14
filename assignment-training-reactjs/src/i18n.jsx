import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Vietnamese from './assets/locales/vi/vi.json';
import English from './assets/locales/en/en.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'vi',
  lng: 'vi',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: English,
    },
    vi: {
      translation: Vietnamese,
    },
  },
});

export default i18n;
