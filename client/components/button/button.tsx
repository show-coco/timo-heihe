import React from "react";

export type ButtonProps = {
  variant?: "primary" | "outline";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  children: React.ReactNode;
};

const sizes = {
  small: "py-1.5 px-4",
  medium: "py-2 px-5",
  large: "py-3 px-8",
};

const variants = {
  primary: "text-white bg-orange-500",
  outline: "text-gray-600 bg-transparent shadow-inner",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  ...props
}: ButtonProps) => {
  const baseButton = "font-bold w-max rounded-md hover:bg-orange-600";
  const sizeMode = sizes[size];
  const buttonType = variants[variant];

  return (
    <button
      type="button"
      className={`${buttonType} ${baseButton} ${sizeMode}`}
      {...props}
    >
      {children}
    </button>
  );
};
