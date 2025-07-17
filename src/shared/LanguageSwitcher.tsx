"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import  { useLanguage }  from "@/providers/LanguageProvider";

const languages = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
];

export function LanguageSwitcher() {
  const { selectedLangCode, setSelectedLangCode } = useLanguage();

  console.log(selectedLangCode);

  const currentLanguage = languages.find(
    (lang) => lang.code === selectedLangCode
  );

  console.log(currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {currentLanguage?.flag} {currentLanguage?.nativeName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => {
              console.log("Switching to", language.code);
              setSelectedLangCode(language.code as "en" | "ar");
            }}
            className={selectedLangCode === language.code ? "bg-accent" : ""}
          >
            <span className="mr-2">{language.flag}</span>
            {language.nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
