import React from "react";
import { ACSelectedData } from "../auto-complate/auto-complate";
import { SkillPochi, SkillPochiProps } from "./skill-pochi";

export type LanguagePochiSetProps = {
  skills: SkillPochiProps["skill"][];
  className?: string;
  selectedData: ACSelectedData[];
  setSelected: React.Dispatch<React.SetStateAction<ACSelectedData[]>>;
};

export const EditableSkillPochiSet: React.FC<LanguagePochiSetProps> = ({
  skills,
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
    setSelected(newSelectedData);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {skills.map((skill, i) => (
        <SkillPochi
          skill={skill}
          key={i}
          className={`mr-4 mt-2 cursor-pointer editable-language relative`}
          onClick={(e) => onClick(e, skill)}
        />
      ))}
    </div>
  );
};
