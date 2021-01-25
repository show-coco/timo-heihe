import React from "react";
import { ACSelectedData } from "../auto-complate/auto-complate";
import { LanguagePochi, LanguagePochiProps } from "./language-pochi";

export type LanguagePochiSetProps = {
  languages: LanguagePochiProps["language"][];
  className?: string;
  selectedData: ACSelectedData[];
  setSelected: React.Dispatch<React.SetStateAction<ACSelectedData[]>>;
};

export const EditableLanguagePochiSet: React.FC<LanguagePochiSetProps> = ({
  languages,
  className,
  selectedData,
  setSelected,
}: LanguagePochiSetProps) => {
  const onClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    language: string
  ) => {
    event.preventDefault();
    const newSelectedData = selectedData.filter(
      (data) => data.name !== language
    );
    console.log(newSelectedData);
    setSelected(newSelectedData);
  };

  return (
    <div className={`flex flex-wrap ${className}`}>
      {languages.map((lang, i) => (
        <LanguagePochi
          language={lang}
          key={i}
          className={`mr-4 mt-2 cursor-pointer editable-language relative`}
          onClick={(e) => onClick(e, lang)}
        />
      ))}
    </div>
  );
};
