import React from "react";
import { Meta } from "@storybook/react";
import { Tooltip } from "./tooltip";
import { Button } from "../button";

export default {
  title: "Tooltip",
  component: Tooltip,
} as Meta;

export const Basic: React.FC = () => {
  return (
    <>
      <Button className="tool">なんだろう</Button>
      <Tooltip>編集する</Tooltip>
    </>
  );
};
