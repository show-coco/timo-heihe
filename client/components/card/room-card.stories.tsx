import { Meta } from "@storybook/react";
import React from "react";
import { RoomCard, RoomCardProps } from "./room-card";

export default {
  title: "TeamCard",
  components: RoomCard,
} as Meta;

const mock: RoomCardProps = {
  id: 1,
  title: "hello",
  slug: "test-1",
  icon: "http://flat-icon-design.com/f/f_object_158/s256_f_object_158_0bg.png",
  withApplication: false,
  description: "vneaivneoiavnrioanv",
  owner: {
    id: 1,
    userId: "test-user-1",
    avatar:
      "http://flat-icon-design.com/f/f_object_158/s256_f_object_158_0bg.png",
    name: "ropital",
  },
  skills: [{ id: 1, name: "typescript" }],
  createdAt: "",
};

export const basic = () => {
  return <RoomCard {...mock} className="border-2 border-gray-200" />;
};
