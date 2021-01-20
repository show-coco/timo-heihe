import React from "react";

type CheckBoxProps = {
  children: React.ReactNode;
  checked?: boolean;
  onChange?: () => void;
  className?: string;
};

export const Checkbox: React.FC<CheckBoxProps> = ({
  children,
  checked,
  onChange,
  className,
}: CheckBoxProps) => {
  return (
    <label
      className={`inline-flex items-center ${className}`}
      onChange={onChange}
    >
      <input
        type="checkbox"
        className="form-checkbox text-orange-500"
        checked={checked}
      />
      <div className="ml-2">{children}</div>
    </label>
  );
};
