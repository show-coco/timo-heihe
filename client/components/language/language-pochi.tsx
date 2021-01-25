import React from "react";
import { Pochi } from "../pochi/pochi";

export type LanguagePochiProps = {
  language: string;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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
  graphql: {
    color: "bg-pink-500",
    name: "GraphQL",
  },
  nestjs: {
    color: "bg-red-600",
    name: "Nest.js",
  },
  nuxtjs: {
    color: "bg-green-600",
    name: "Nuxt.js",
  },
  nextjs: {
    color: "bg-blue-500",
    name: "next.js",
  },
};

export const LanguagePochi: React.FC<LanguagePochiProps> = ({
  language,
  className,
  onClick,
}: LanguagePochiProps) => {
  if (
    language !== "typescript" &&
    language !== "graphql" &&
    language !== "go" &&
    language !== "nextjs" &&
    language !== "nestjs" &&
    language !== "nuxtjs"
  ) {
    return <p>スキルが存在しません</p>;
  }

  return (
    <span
      className={`flex items-center space-x-2 ${className}`}
      onClick={onClick}
    >
      <Pochi className={languages[language].color} />
      <span>{languages[language].name}</span>
    </span>
  );
};
