import React from "react";
import { useState } from "react";
import { useEditThreadMutation } from "../generated/types";

export const useChatItem = (initialText: string) => {
  const [onEdit, setOnEdit] = useState(false);
  const [text, setText] = useState(initialText);
  const [editThread] = useEditThreadMutation();

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

  const onClickSave = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault();

    try {
      await editThread({
        variables: {
          input: {
            id: id,
            text: text,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
    setOnEdit(false);
  };

  return {
    onClickEdit,
    onClickCancel,
    onClickSave,
    onChangeText,
    onEdit,
    text,
  };
};
