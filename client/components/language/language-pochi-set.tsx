import React from "react";
import { SkillModel } from "../../generated/types";
import { LanguagePochi, LanguagePochiProps } from "./language-pochi";

export type LanguagePochiSetProps = {
  languages: LanguagePochiProps["language"][];
  className?: string;
};

export const convertToSkillPochiSetArray = (
  skills: Pick<SkillModel, "id" | "name">[] | null | undefined
) => {
  if (skills == null) return [];
  return skills.map((skill) => skill.name);
};

export const LanguagePochiSet: React.FC<LanguagePochiSetProps> = ({
  languages,
  className,
}: LanguagePochiSetProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {languages.map((lang, i) => (
        <LanguagePochi language={lang} key={i} className={`mr-4 mt-2`} />
      ))}
    </div>
  );
};
