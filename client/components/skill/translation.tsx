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
 * 小文字でDBに保存されているスキルの名前を、表示する形式に変換する
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
