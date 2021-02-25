import React from "react";

type TextAreaProps = {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextArea: React.FC<TextAreaProps> = ({
  className,
  ...props
}: TextAreaProps) => {
  return (
    <textarea
      className={`resize-none border-none bg-blue-100 rounded-sm w-full h-full ${className}`}
      {...props}
    />
  );
};
