import React from "react";

type CheckBoxProps = {
  children: React.ReactNode;
};

export const Checkbox: React.FC<CheckBoxProps> = ({
  children,
}: CheckBoxProps) => {
  return (
    <label className="inline-flex items-center">
      <input type="checkbox" className="form-checkbox text-orange-500" />
      <div className="ml-2">{children}</div>
    </label>
  );
};
