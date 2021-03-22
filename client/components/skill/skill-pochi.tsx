import React from "react";
import { Pochi } from "../pochi/pochi";
import { SkillTranslation } from "./translation";

export type SkillPochiProps = {
  skill: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const languageColors = {
  typescript: "bg-blue-400",
  go: "bg-blue-200",
  graphql: "bg-pink-500",
  nestjs: "bg-red-600",
  nuxtjs: "bg-green-600",
  nextjs: "bg-blue-500",
};

export const SkillPochi: React.FC<SkillPochiProps> = ({
  skill,
  className,
  onClick,
}: SkillPochiProps) => {
  if (
    skill !== "typescript" &&
    skill !== "graphql" &&
    skill !== "go" &&
    skill !== "nextjs" &&
    skill !== "nestjs" &&
    skill !== "nuxtjs"
  ) {
    return <p>スキルが存在しません</p>;
  }

  return (
    <span
      className={`flex items-center space-x-2 ${className}`}
      onClick={onClick}
    >
      <Pochi className={languageColors[skill]} />
      <SkillTranslation>{skill}</SkillTranslation>
    </span>
  );
};
