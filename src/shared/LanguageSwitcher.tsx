"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers/LanguageProvider";

const languages = {
  en: { code: "en", label: "Ar", flag: "🇸🇦" },
  ar: { code: "ar", label: "Eng", flag: "🇺🇸" }
};

export function LanguageSwitcher() {
  const { selectedLangCode, setSelectedLangCode } = useLanguage();

  const handleToggle = () => {
    setSelectedLangCode(selectedLangCode === "en" ? "ar" : "en");
  };

  const { label, flag } = selectedLangCode === "en" ? languages.en : languages.ar;

  return (
    <Button onClick={handleToggle} variant="outline" size="sm">
      {flag} {label}
    </Button>
  );
}
