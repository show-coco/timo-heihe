import { Meta } from "@storybook/react";
import React from "react";
import { mockTeams, TeamCard } from "./team-card";

export default {
  title: "TeamCard",
  components: TeamCard,
} as Meta;

export const basic = () => {
  const team = mockTeams[0];
  return <TeamCard {...team} className="border-2 border-gray-200" />;
};
