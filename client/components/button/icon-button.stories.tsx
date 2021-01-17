import React from "react";
import { Meta } from "@storybook/react";
import { IconButton } from "./icon-button";

export default {
  title: "IconButton",
  component: IconButton,
} as Meta;

const sizes = ["small", "medium", "large"] as const;
const variants = ["outline", "primary", "ghost"] as const;

export const withSizes = () => {
  return (
    <div className="flex items-center space-x-5">
      {sizes.map((size) => (
        <IconButton
          size={size}
          key={size}
          icon={<span className="text-white">i</span>}
        />
      ))}
    </div>
  );
};

export const withVariants = () => {
  return (
    <div className="flex items-center space-x-5">
      {variants.map((variant) => (
        <IconButton variant={variant} key={variant}>
          i
        </IconButton>
      ))}
    </div>
  );
};
