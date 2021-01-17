import React from "react";

type CardProps = {
  children: React.ReactNode;
  variant?: "outline" | "none";
  className?: string;
};

const defaultStyle = "p-8 m-10 rounded-md bg-white shadow-sm";
const variants = {
  outline: "border-2 border-gray-300",
  none: "",
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = "outline",
  ...props
}: CardProps) => {
  const variantStyle = variants[variant];

  return (
    <div className={`${defaultStyle} ${variantStyle} ${props.className}`}>
      {children}
    </div>
  );
};
