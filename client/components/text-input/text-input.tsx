import React from "react";

type TextInputProps = {
  placeholder?: string;
  className?: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// eslint-disable-next-line react/display-name
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, ...props }: TextInputProps, ref) => {
    return (
      <input
        type="text"
        ref={ref}
        className={`border-none bg-blue-100 rounded-sm ${className}`}
        {...props}
      />
    );
  }
);
