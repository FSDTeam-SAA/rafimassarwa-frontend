"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers/LanguageProvider";
import Image from "next/image";

const languages = {
  en: {
    code: "en",
    label: "Ar",
    flag: (
      <Image
        src={"/images/arabic-flag.png"}
        alt="arabic-flag"
        width={1000}
        height={1000}
        className="h-5 w-5"
      />
    ),
  },
  ar: {
    code: "ar",
    label: "Eng",
    flag: (
      <Image
        src={"/images/american-flag.png"}
        alt="arabic-flag"
        width={1000}
        height={1000}
        className="h-5 w-5"
      />
    ),
  },
};

export function LanguageSwitcher() {
  const { selectedLangCode, setSelectedLangCode } = useLanguage();

  const handleToggle = () => {
    setSelectedLangCode(selectedLangCode === "en" ? "ar" : "en");
  };

  const { label, flag } =
    selectedLangCode === "en" ? languages.en : languages.ar;

  return (
    <Button onClick={handleToggle} variant="outline" size="sm">
      {flag} {label}
    </Button>
  );
}
