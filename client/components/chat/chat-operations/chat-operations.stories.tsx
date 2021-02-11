import React from "react";
import { Meta } from "@storybook/react";
import { ChatOperations } from "./chat-operations";

export default {
  title: "ChatOperations",
  component: ChatOperations,
} as Meta;

export const Basic: React.FC = () => {
  return <ChatOperations />;
};
