import React from "react";

type RadioProps = {
  className?: string;
  name: string;
  text: string;
  value: string;
  checked?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Radio: React.FC<RadioProps> = ({
  className,
  name,
  text,
  ...props
}: RadioProps) => {
  return (
    <label className={`flex items-center space-x-2 ${className}`}>
      <input type="radio" name={name} {...props} />
      <span>{text}</span>
    </label>
  );
};
