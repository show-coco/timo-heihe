import React from "react";

type CardProps = {
  children: React.ReactNode;
  variant?: "outline" | "none" | "shadow";
  className?: string;
  role?: "button";
  tabIndex?: number;
};

const defaultStyle = "md:p-5 rounded-md bg-white";
const variants = {
  outline: "border-2 border-gray-300",
  shadow: "shadow-sm",
  none: "",
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = "shadow",
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
