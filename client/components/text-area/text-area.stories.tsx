import React from "react";
import { Meta } from "@storybook/react";
import { TextArea } from ".";

export default {
  title: "TextArea",
  component: TextArea,
} as Meta;

export const Basic: React.FC = () => {
  return (
    <div className="h-32 w-1/2">
      <TextArea />
    </div>
  );
};
