import React from "react";

type CardProps = {
  children: React.ReactNode;
  variant?: "outline" | "none" | "shadow";
  className?: string;
  role?: "button";
  tabIndex?: number;
};

const defaultStyle = "p-3 rounded-md bg-white";
const variants = {
  outline: "border-2 border-gray-300",
  shadow: "shadow-lg",
  none: "",
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = "none",
  role,
  tabIndex,
  ...props
}: CardProps) => {
  const variantStyle = variants[variant];

  return (
    <div
      className={`${defaultStyle} ${variantStyle} ${props.className}`}
      role={role}
      tabIndex={tabIndex}
    >
      {children}
    </div>
  );
};
