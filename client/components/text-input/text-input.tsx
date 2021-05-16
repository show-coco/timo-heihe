import React, { Fragment } from "react";
import { TextInputErrorType } from "../../hooks/useTextInput";

export type TextInputProps = {
  className?: string;
  placeholder?: string;
  name?: string;
  icon?: React.ReactNode;
  required?: boolean;
  value: string;
  errors: TextInputErrorType[];
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

// eslint-disable-next-line react/display-name
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, ...props }: TextInputProps, ref) => {
    const borderStyle = props.errors?.length
      ? "border-blue-500"
      : "border-none";

    const propsStyle = props.required ? "flex" : "block";
    return (
      <Fragment>
        <div className={propsStyle}>
          {props.name && (
            <label className="m-0 text-lg font-bold text-gray-700 ">
              {props.name}
              {props.required && <span className="text-red-500">*</span>}
            </label>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {props.icon && props.icon}
          <input
            type="text"
            ref={ref}
            className={`bg-blue-100 rounded-sm w-full ${borderStyle} ${className}`}
            {...props}
          />
        </div>
        <ul>
          {props.errors?.map((error) => (
            <li key={error.code} className="text-blue-500">
              ・{error.message}
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
);
