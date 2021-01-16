import React from "react";

export type ButtonProps = {
  variant?: "primary" | "outline";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const sizes = {
  small: "px-4 h-8",
  medium: "px-5 h-10",
  large: "px-8 h-14",
};

const variants = {
  primary: "text-white bg-orange-500",
  outline: "text-gray-600 bg-transparent shadow-inner",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseButton = "font-bold w-max rounded-md hover:bg-orange-600";
  const sizeMode = sizes[size];
  const buttonType = variants[variant];

  return (
    <button
      type="button"
      className={`${buttonType} ${baseButton} ${sizeMode} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
