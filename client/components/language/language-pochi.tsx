import React from "react";
import { Pochi } from "../pochi/pochi";

export type LanguagePochiProps = {
  language: "typescript" | "go";
  className?: string;
};

const languages = {
  typescript: {
    color: "bg-blue-400",
    name: "TypeScript",
  },
  go: {
    color: "bg-blue-200",
    name: "Go",
  },
};

export const LanguagePochi: React.FC<LanguagePochiProps> = ({
  language,
  className,
}: LanguagePochiProps) => {
  return (
    <span className={`flex items-center space-x-2 ${className}`}>
      <Pochi className={languages[language].color} />
      <span>{languages[language].name}</span>
    </span>
  );
};
