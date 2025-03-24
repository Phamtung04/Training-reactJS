import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../i18n';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  
  const switchLanguage = (language) => {
    changeLanguage(language);
  };

  return {
    currentLanguage: i18n.language,
    switchLanguage,
    isVietnamese: i18n.language === 'vi',
    isEnglish: i18n.language === 'en'
  };
};
