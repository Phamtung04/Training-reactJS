import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Vietnamese from './assets/locales/vi/vi.json';
import English from './assets/locales/en/en.json';

const savedLanguage = localStorage.getItem('language') || 'vi';

i18n.use(initReactI18next).init({
  fallbackLng: 'vi',
  lng: savedLanguage,
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

export const changeLanguage = (language) => {
  localStorage.setItem('language', language);
  i18n.changeLanguage(language);
};

export default i18n;
