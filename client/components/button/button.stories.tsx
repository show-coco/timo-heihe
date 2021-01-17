import React from "react";
import { Meta } from "@storybook/react";
import { Button } from "./button";

export default {
  title: "Button",
  component: Button,
} as Meta;

const sizes = ["small", "medium", "large"] as const;
const variants = ["outline", "primary", "ghost"] as const;

export const withSizes = () => {
  return (
    <div className="flex items-center space-x-5">
      {sizes.map((size) => (
        <Button size={size} key={size}>
          Hello
        </Button>
      ))}
    </div>
  );
};

export const withVariants = () => {
  return (
    <div className="flex items-center space-x-5">
      {variants.map((variant) => (
        <Button variant={variant} key={variant}>
          Hello
        </Button>
      ))}
    </div>
  );
};
