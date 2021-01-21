import { Meta } from "@storybook/react";
import React from "react";
import { useFileInput } from "../../hooks/useFileInput";
import { FileInput } from "./file-inpute";

export default {
  title: "FileInput",
  component: FileInput,
} as Meta;

export const Basic = () => {
  const { fileRef, onChange, onClick } = useFileInput();

  return <FileInput ref={fileRef} onChange={onChange} onClick={onClick} />;
};
