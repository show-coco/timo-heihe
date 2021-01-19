import React from "react";
import { TeamCard, TeamCardProps } from "../components/card/team-card";
import { Template } from "../components/template/template";
import { useTeamQuery } from "../generated/types";

export default function Home() {
  const { data, error } = useTeamQuery();
  if (error) console.log(error);
  console.log(data);
  return (
    <Template>
      {mockTeams.map((team, i) => (
        <TeamCard {...team} key={i} />
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
