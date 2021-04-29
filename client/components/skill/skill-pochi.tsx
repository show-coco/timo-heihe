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
  reactjs: "bg-blue-600",
  nodejs: "bg-green-700",
  javascript: "bg-yellow-300",
  python: "bg-indigo-500",
  aws: "bg-yellow-500",
  docker: "bg-blue-300",
  flutter: "bg-blue-100",
  github: "bg-gray-900",
  ios: "bg-gray-600",
  rails: "bg-red-500",
  ruby: "bg-red-600",
  nextjs: "bg-blue-500",
  php: "bg-indigo-400",
  swift: "bg-yellow-400",
  android: "bg-green-400",
  unity: "bg-gray-800",
  git: "bg-gray-600",
  linux: "bg-yellow-200",
  firebase: "bg-yellow-600",
  vuejs: "bg-green-300",
  rust: "bg-gray-500",
  laravel: "bg-red-300",
  java: "bg-blue-100",
  "c#": "bg-green-200",
  gcp: "bg-blue-600",
  dart: "bg-blue-700",
  html5: "bg-yellow-600",
  kubernetes: "bg-blue-900",
  "machine-lerning": "bg-blue-800",
  "c++": "bg-blue-700",
  kotlin: "bg-yellow-700",
  gatsbyjs: "bg-indigo-200",
  azure: "bg-indigo-300",
  mysql: "bg-pink-300",
  postgresql: "bg-indigo-600",
  "react-native": "bg-blue-50",
  terraform: "bg-indigo-100",
};

export const SkillPochi: React.FC<SkillPochiProps> = ({
  skill,
  className,
  onClick,
}: SkillPochiProps) => {
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
