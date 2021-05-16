import { Meta } from "@storybook/react";
import React from "react";
import { useFileInput } from "../../hooks/useFileInput";
import { FileInput } from "./file-inpute";

export default {
  title: "FileInput",
  component: FileInput,
} as Meta;

export const Basic = () => {
  const { fileRef, onChangeFileInput, onClickFileInput } = useFileInput();

  return (
    <FileInput
      ref={fileRef}
      onChange={onChangeFileInput}
      onClick={onClickFileInput}
    />
  );
};
