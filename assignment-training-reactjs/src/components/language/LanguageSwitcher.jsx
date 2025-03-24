import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../i18n';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const handleLanguageChange = (language) => {
    changeLanguage(language);
  };

  return (
    <div className="language-switcher">
      <button 
        className={i18n.language === 'vi' ? 'active' : ''}
        onClick={() => handleLanguageChange('vi')}
      >
        Tiếng Việt
      </button>
      <button 
        className={i18n.language === 'en' ? 'active' : ''}
        onClick={() => handleLanguageChange('en')}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;
