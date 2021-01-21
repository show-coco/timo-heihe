import React from "react";

type RadioProps = {
  className?: string;
  name: string;
  text: string;
};

export const Radio: React.FC<RadioProps> = ({
  className,
  name,
  text,
}: RadioProps) => {
  return (
    <label className={`flex items-center space-x-2 ${className}`}>
      <input type="radio" name={name} />
      <span>{text}</span>
    </label>
  );
};
