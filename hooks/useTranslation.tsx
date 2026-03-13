"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { en } from "@/locales/en";
import { ar } from "@/locales/ar";
import { fr } from "@/locales/fr";
import { de } from "@/locales/de";

type Translations = typeof en;

interface Language {
  code: string;
  name: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export const languages: Language[] = [
  { code: "en", name: "English", flag: "EN", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "AR", dir: "rtl" },
  { code: "fr", name: "Français", flag: "FR", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "DE", dir: "ltr" },
];

const translations: Record<string, Translations> = {
  en,
  ar,
  fr,
  de,
};

interface TranslationContextType {
  language: Language;
  setLanguage: (code: string) => void;
  t: (key: keyof Translations) => string;
  dir: "ltr" | "rtl";
}

const TranslationContext = createContext<TranslationContextType>({
  language: languages[0],
  setLanguage: () => {},
  t: (key) => key as string,
  dir: "ltr",
});

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(languages[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("language");
    const browserLang = navigator.language.split("-")[0];
    
    const foundLang = languages.find(l => l.code === savedLang) || 
                      languages.find(l => l.code === browserLang) || 
                      languages[0];
    
    setLanguageState(foundLang);
    document.documentElement.dir = foundLang.dir;
    document.documentElement.lang = foundLang.code;
  }, []);

  const setLanguage = (code: string) => {
    const newLang = languages.find(l => l.code === code);
    if (newLang) {
      setLanguageState(newLang);
      localStorage.setItem("language", code);
      document.documentElement.dir = newLang.dir;
      document.documentElement.lang = newLang.code;
    }
  };

  const t = (key: keyof Translations): string => {
    const trans = translations[language.code] || translations.en;
    return trans[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, dir: language.dir }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  return useContext(TranslationContext);
};

