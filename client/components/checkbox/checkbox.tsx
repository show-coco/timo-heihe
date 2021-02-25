import React from "react";

type CheckBoxProps = {
  children: React.ReactNode;
  checked?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  className?: string;
  value?: number | string;
};

export const Checkbox: React.FC<CheckBoxProps> = ({
  children,
  checked,
  className,
  ...props
}: CheckBoxProps) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        className="form-checkbox text-orange-500"
        checked={checked}
        {...props}
      />
      <div className="ml-2">{children}</div>
    </label>
  );
};
