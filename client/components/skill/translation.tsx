import React from "react";

type Props = {
  children: string;
};

const skills = {
  typescript: "TypeScript",
  go: "Go",
  graphql: "GraphQL",
  nestjs: "NestJS",
  nuxtjs: "Nust.js",
  reactjs: "React.js",
  nodejs: "Node.js",
  javascript: "JavaScript",
  python: "Python",
  aws: "AWS",
  docker: "Docker",
  flutter: "Flutter",
  github: "Github",
  ios: "iOS",
  rails: "Rails",
  ruby: "Ruby",
  nextjs: "Nest.js",
  php: "PHP",
  swift: "Swift",
  android: "Android",
  unity: "Unity",
  git: "Git",
  linux: "Linux",
  firebase: "Firebase",
  vuejs: "Vue.js",
  rust: "Rust",
  laravel: "Laravel",
  java: "Java",
  "c#": "C#",
  gcp: "GCP",
  dart: "Dart",
  html5: "HTML5",
  kubernetes: "Kubernetes",
  "machine-lerning": "Machine Learning",
  "c++": "C++",
  kotlin: "Kotlin",
  gatsbyjs: "Gatsby.js",
  azure: "Azure",
  mysql: "MySQL",
  postgresql: "PostgreSQL",
  "react-native": "ReactNative",
  terraform: "Terraform",
};

/**
 * 小文字でDBに保存されているスキルの名前を、表示する形式に変換する
 */
export const SkillTranslation: React.FC<Props> = ({ children }: Props) => {
  return <span>{skills[children]}</span>;
};
