import React from "react";
import { TextInputProps } from "./text-input";

export const TextArea: React.FC<TextInputProps> = ({
  className,
  ...props
}: TextInputProps) => {
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
      <ul>
        {props.errors?.map((error) => (
          <li key={error.code} className="text-blue-500">
            ・{error.message}
          </li>
        ))}
      </ul>
    </div>
  );
};
