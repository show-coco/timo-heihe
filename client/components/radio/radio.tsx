import React from "react";

type RadioProps = {
  className?: string;
  name: string;
  text: string;
  value: string;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Radio: React.FC<RadioProps> = ({
  className,
  name,
  text,
  ...props
}: RadioProps) => {
  return (
    <label
      className={`flex items-center space-x-2 cursor-pointer ${className}`}
    >
      <input type="radio" name={name} {...props} />
      <span>{text}</span>
    </label>
  );
};
