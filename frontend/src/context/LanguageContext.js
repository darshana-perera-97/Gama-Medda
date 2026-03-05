import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const STORAGE_KEY = 'avurudu_language';

export function LanguageProvider({ children }) {
  // Get initial language from localStorage or default to 'EN'
  const getInitialLanguage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored || 'EN';
    } catch (error) {
      return 'EN';
    }
  };

  const [language, setLanguage] = useState(getInitialLanguage);

  // Save to localStorage whenever language changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  }, [language]);

  const changeLanguage = (lang) => {
    if (['EN', 'SI', 'TA'].includes(lang)) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

