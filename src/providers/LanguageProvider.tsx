"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { enLangs } from "@/dictionaries/en";
import { arLangs } from "@/dictionaries/ar";
import { LangTypes } from "@/dictionaries/types/langtypes";

interface LanguageContextType {
  selectedLangCode: "en" | "ar";
  setSelectedLangCode: React.Dispatch<React.SetStateAction<"en" | "ar">>;
  dictionary: LangTypes;
}

const languageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(languageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

const LanguageProvider: React.FC<Props> = ({ children }) => {
  const [selectedLangCode, setSelectedLangCode] = useState<"en" | "ar">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("selectedLang") as "en" | "ar") || "en";
    }
    return "en";
  });

  const [dictionary, setDictionary] = useState<LangTypes>(
    selectedLangCode === "ar" ? arLangs : enLangs
  );

  // Save language selection to localStorage
  useEffect(() => {
    localStorage.setItem("selectedLang", selectedLangCode);
    setDictionary(selectedLangCode === "en" ? enLangs : arLangs);
  }, [selectedLangCode]);

  return (
    <languageContext.Provider
      value={{ selectedLangCode, setSelectedLangCode, dictionary }}
    >
      {children}
    </languageContext.Provider>
  );
};

export default LanguageProvider;
