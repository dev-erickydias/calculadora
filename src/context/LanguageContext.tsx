"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { translations, LangCode, Translation } from "@/data/translations";

interface LanguageContextType {
  lang: LangCode;
  t: Translation;
  setLang: (code: LangCode) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: translations.en,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    const saved = localStorage.getItem("salarium_lang") as LangCode | null;
    if (saved && translations[saved]) {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((code: LangCode) => {
    setLangState(code);
    localStorage.setItem("salarium_lang", code);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
