import React from "react";
import { Meta } from "@storybook/react";
import { Checkbox } from "./checkbox";

export default {
  title: "Checkbox",
  component: Checkbox,
} as Meta;

export const Basic = () => {
  return <Checkbox>checkbox</Checkbox>;
};
