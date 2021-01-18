import React from "react";
import { TeamCard, TeamCardProps } from "../components/card/team-card";
import { Template } from "../components/template/template";

export default function Home() {
  return (
    <Template>
      {mockTeams.map((team) => (
        <TeamCard {...team} key={team.title} />
      ))}
    </Template>
  );
}

const mockTeams: TeamCardProps[] = [
  {
    title: "Web開発",
    leader: {
      name: "Ropital",
      src: "https://bit.ly/ryan-florence",
    },
    description:
      "チーム募集Webアプリを開発しています。PrismaやTypeScript, GraphQL,Goなどを使用 しています！モダン技術が好きな方是非きてください！",
    languages: ["go", "typescript", "go", "typescript", "go", "typescript"],
    created: "2020/9/12",
    people: {
      current: 22,
      limit: 50,
    },
  },
  {
    title: "Web開発",
    leader: {
      name: "Ropital",
      src: "https://bit.ly/ryan-florence",
    },
    description:
      "チーム募集Webアプリを開発しています。PrismaやTypeScript, GraphQL,Goなどを使用 しています！モダン技術が好きな方是非きてください！",
    languages: ["go", "typescript", "go", "typescript", "go", "typescript"],
    created: "2020/9/12",
    people: {
      current: 22,
      limit: 50,
    },
  },
  {
    title: "Web開発",
    leader: {
      name: "Ropital",
      src: "https://bit.ly/ryan-florence",
    },
    description:
      "チーム募集Webアプリを開発しています。PrismaやTypeScript, GraphQL,Goなどを使用 しています！モダン技術が好きな方是非きてください！",
    languages: ["go", "typescript", "go", "typescript", "go", "typescript"],
    created: "2020/9/12",
    people: {
      current: 22,
      limit: 50,
    },
  },
];
