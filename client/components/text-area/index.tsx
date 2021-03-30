import React, { Fragment } from "react";

type TextAreaProps = {
  placeholder?: string;
  className?: string;
  value?: string;
  name?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextArea: React.FC<TextAreaProps> = ({
  className,
  ...props
}: TextAreaProps) => {
  return (
    <Fragment>
      <div className="flex">
        {props.name && (
          <label className="text-lg font-bold text-gray-700 m-0 ">
            {props.name}
            {props.required && <span className="text-red-500">*</span>}
          </label>
        )}
      </div>
      <textarea
        className={`resize-none border-none bg-blue-100 rounded-sm w-full h-full ${className}`}
        {...props}
      />
    </Fragment>
  );
};
