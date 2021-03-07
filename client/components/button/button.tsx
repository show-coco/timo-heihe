import React from "react";

export type ButtonProps = {
  variant?: "solid" | "outline" | "ghost" | "underline";
  colorScheme?: "orange" | "blue" | "red";
  size?: "small" | "medium" | "large";
  isIcon?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "submit";
  roundedTop?: boolean;
};

const defaultStyle =
  "font-bold w-auto inline-flex justify-center items-center relative border-box";

const sizes = {
  small: "h-8 min-w-8",
  medium: "h-10 min-w-10",
  large: "h-14 min-w-14",
};

const paddings = {
  icon: "p-0",
  small: "px-4",
  medium: "px-6",
  large: "px-8",
};

const hoverAnimation = {
  black: "hover:bg-opacity-30",
  orange: "hover:bg-orange-600",
  blue: "hover:bg-blue-600",
};

const variants = {
  solid: `text-white`,
  outline: `bg-transparent border  hover:bg-black-100 ${hoverAnimation["black"]}`,
  ghost: `hover:bg-black-400 ${hoverAnimation["black"]} `,
  underline: `hover:bg-black-400 ${hoverAnimation["black"]} border-b-2 border-orange-300`,
};

const colorSchemesForSolid = {
  orange: `bg-orange-500 ${hoverAnimation["orange"]}`,
  blue: `bg-blue-500 ${hoverAnimation["blue"]}`,
};

const colorSchemeseForOutline = {
  orange: `text-orange-500 border-orange-500`,
  blue: `text-blue-500 border-blue-500`,
  red: `text-red-500 border-red-500`,
};

// eslint-disable-next-line react/display-name
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      size = "medium",
      colorScheme = "orange",
      children,
      className,
      isIcon,
      roundedTop,
      ...props
    }: ButtonProps,
    ref
  ) => {
    const sizeStyle = sizes[size];
    const variantStyle = variants[variant];
    let colorSchemeStyle;
    switch (variant) {
      case "solid":
        colorSchemeStyle = colorSchemesForSolid[colorScheme];
        break;
      case "outline":
        colorSchemeStyle = colorSchemeseForOutline[colorScheme];
    }
    const disabledStyle = props.disabled ? "opacity-50" : "";
    const paddingStyle = isIcon ? paddings["icon"] : paddings[size];
    const roundedStyle = roundedTop ? "rounded-t-md" : "rounded-md";

    return (
      <button
        type="button"
        className={`${variantStyle} ${defaultStyle} ${sizeStyle} ${paddingStyle} ${disabledStyle} ${className} ${roundedStyle} ${colorSchemeStyle}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
