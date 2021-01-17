import { Meta } from "@storybook/react";
import React from "react";
import { Avatar } from "./avatar";

export default {
  title: "Avatar",
  component: Avatar,
} as Meta;

const sizes = ["small", "medium", "large"] as const;

export const withSizes = () => {
  return (
    <div className="flex items-center space-x-5">
      {sizes.map((size) => (
        <Avatar src="https://bit.ly/kent-c-dodds" size={size} key={size} />
      ))}
    </div>
  );
};
