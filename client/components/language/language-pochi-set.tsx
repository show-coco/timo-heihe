import React from "react";
import { LanguagePochi, LanguagePochiProps } from "./language-pochi";

export type LanguagePochiSetProps = {
  languages: LanguagePochiProps["language"][];
  className?: string;
};

export const LanguagePochiSet: React.FC<LanguagePochiSetProps> = ({
  languages,
  className,
}: LanguagePochiSetProps) => {
  return (
    <div className={`flex flex-wrap ${className}`}>
      {languages.map((lang) => (
        <LanguagePochi language={lang} key={lang} className={`mr-4 mt-2`} />
      ))}
    </div>
  );
};
