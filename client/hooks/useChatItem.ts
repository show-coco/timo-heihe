import React from "react";
import { useState } from "react";

export const useChatItem = (initialText: string) => {
  const [onEdit, setOnEdit] = useState(false);
  const [text, setText] = useState(initialText);

  const onClickEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setOnEdit(true);
  };

  const onClickCancel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setOnEdit(false);
  };

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return {
    onClickEdit,
    onClickCancel,
    onEdit,
    onChangeText,
    text,
  };
};
