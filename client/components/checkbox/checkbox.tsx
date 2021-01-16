import React from "react";

type CheckBoxProps = {
  children: React.ReactNode;
  checked?: boolean;
  onChange?: () => void;
};

export const Checkbox: React.FC<CheckBoxProps> = ({
  children,
  checked,
  onChange,
}: CheckBoxProps) => {
  return (
    <label className="inline-flex items-center" onChange={onChange}>
      <input
        type="checkbox"
        className="form-checkbox text-orange-500"
        checked={checked}
      />
      <div className="ml-2">{children}</div>
    </label>
  );
};
