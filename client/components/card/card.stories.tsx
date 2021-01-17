import { Meta } from "@storybook/react";
import React from "react";
import { Card } from "./card";

export default {
  title: "Card",
  component: Card,
} as Meta;

const variants = ["none", "outline"] as const;

export const basic = () => {
  return (
    <Card>
      <p>Hello</p>
      <p>こんにちは</p>
    </Card>
  );
};

export const withVariants = () => {
  return variants.map((variant) => (
    <Card key={variant} variant={variant}>
      <p>Hello</p>
      <p>こんにちは</p>
    </Card>
  ));
};
