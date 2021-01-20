import React from "react";

type TextInputProps = {
  placeholder?: string;
  className?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  className,
  ...props
}: TextInputProps) => {
  return (
    <input
      type="text"
      className={`border-none bg-blue-100 rounded-sm ${className}`}
      {...props}
    />
  );
};
