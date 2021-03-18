import React from "react";

type Props = {
  children: string;
};

const skills = {
  typescript: "TypeScript",
  graphql: "GraphQL",
  go: "Go",
  nextjs: "Next.js",
  nestjs: "NestJS",
  nuxtjs: "Nuxt.js",
};

/**
 *
 */
export const SkillTranslation: React.FC<Props> = ({ children }: Props) => {
  if (
    children !== "typescript" &&
    children !== "graphql" &&
    children !== "go" &&
    children !== "nextjs" &&
    children !== "nestjs" &&
    children !== "nuxtjs"
  ) {
    return <p>スキルが存在しません</p>;
  }

  return <span>{skills[children]}</span>;
};
