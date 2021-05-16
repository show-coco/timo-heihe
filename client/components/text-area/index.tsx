import React, { Fragment } from "react";
import { TextInputErrorType } from "../../hooks/useTextInput";

type TextAreaProps = {
  placeholder?: string;
  className?: string;
  value?: string;
  name?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errors?: TextInputErrorType[];
};

export const TextArea: React.FC<TextAreaProps> = ({
  className,
  ...props
}: TextAreaProps) => {
  const borderStyle = props.errors?.length ? "border-blue-500" : "border-none";

  return (
    <div className="h-full">
      {props.name && (
        <label className="m-0 text-lg font-bold text-gray-700">
          {props.name}
          {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        className={`resize-none bg-blue-100 rounded-sm w-full ${borderStyle} ${className}`}
        {...props}
      />
    </div>
  );
};
