import { Meta } from "@storybook/react";
import React from "react";
import { RoomCard, RoomCardProps } from "./team-card";

export default {
  title: "TeamCard",
  components: RoomCard,
} as Meta;

const mock: RoomCardProps = {
  title: "hello",
  slug: "test-1",
  owner: {
    userId: "test-user-id",
    src: "http://flat-icon-design.com/f/f_object_158/s256_f_object_158_0bg.png",
    name: "test-user-name",
  },
  description: "vneaivneoiavnrioanv",
  languages: ["typescript"],
  createdAt: "",
};

export const basic = () => {
  return <RoomCard {...mock} className="border-2 border-gray-200" />;
};
