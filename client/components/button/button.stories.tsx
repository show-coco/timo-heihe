import React from "react";
import { Meta } from "@storybook/react";
import { Button } from "./button";

export default {
  title: "Button",
  component: Button,
} as Meta;

const sizes = ["small", "medium", "large"] as const;
const variants = ["outline", "primary"] as const;

export const withSizes = () => {
  return (
    <div className="flex flex-col space-y-2">
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
    <div className="flex flex-col space-y-2">
      {variants.map((variant) => (
        <Button variant={variant} key={variant}>
          Hello
        </Button>
      ))}
    </div>
  );
};
