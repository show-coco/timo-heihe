import React from "react";
import { SkillModel } from "../../generated/types";
import { SkillPochi, SkillPochiProps } from "./skill-pochi";

export type SkillPochiSetProps = {
  skills: SkillPochiProps["skill"][];
  className?: string;
};

export const convertToSkillPochiSetArray = (
  skills: Pick<SkillModel, "id" | "name">[] | null | undefined
) => {
  if (skills == null) return [];
  return skills.map((skill) => skill.name);
};

export const SkillPochiSet: React.FC<SkillPochiSetProps> = ({
  skills,
  className,
}: SkillPochiSetProps) => {
  return (
    <div className={`flex ${className} flex-wrap`}>
      {skills.map((lang, i) => (
        <SkillPochi skill={lang} key={i} className={`mr-4 mt-2`} />
      ))}
    </div>
  );
};
