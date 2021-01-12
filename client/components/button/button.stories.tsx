import React from "react";
import { Meta } from "@storybook/react";
import Button from "./button";

export default {
  title: "Button",
  component: Button,
} as Meta;

export const Basic = () => {
  return <Button />;
};
