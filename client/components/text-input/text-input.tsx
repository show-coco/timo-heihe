import React, { Fragment } from "react";
import { TextInputErrorType } from "../../hooks/useTextInput";

type TextInputProps = {
  placeholder?: string;
  className?: string;
  name?: string;
  value?: string;
  required?: boolean;
  icon?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: TextInputErrorType[];
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
      </Fragment>
    );
  }
);
