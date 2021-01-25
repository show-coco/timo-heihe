import React from "react";

export type ButtonProps = {
  variant?: "primary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  isIcon?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "submit";
};

const defaultStyle =
  "font-bold rounded-md w-auto inline-flex justify-center items-center relative border-box";

const sizes = {
  small: "h-8 min-w-8",
  medium: "h-10 min-w-10",
  large: "h-14 min-w-14",
};

const paddings = {
  icon: "p-0",
  small: "px-4",
  medium: "px-4",
  large: "px-8",
};

const hoverAnimation = {
  black: "hover:bg-opacity-30",
  orange: "hover:bg-orange-600",
};

const variants = {
  primary: `text-white bg-orange-500 ${hoverAnimation["orange"]}`,
  outline: `text-red-500 bg-transparent border border-red-500 hover:bg-black-400 ${hoverAnimation["black"]}`,
  ghost: `hover:bg-black-400 ${hoverAnimation["black"]}`,
};

// eslint-disable-next-line react/display-name
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      children,
      className,
      isIcon,
      ...props
    }: ButtonProps,
    ref
  ) => {
    const sizeMode = sizes[size];
    const buttonType = variants[variant];
    const disabledStyle = props.disabled ? "opacity-50" : "";
    const paddingClass = isIcon ? paddings["icon"] : paddings[size];

    return (
      <button
        type="button"
        className={`${buttonType} ${defaultStyle} ${sizeMode} ${paddingClass} ${disabledStyle} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
