import React from "react";
import { SearchConditionsQuery } from "../../generated/types";
import { TextInputProps } from "../text-input/text-input";

type RoomEditFormProps = {
  selectableData: SearchConditionsQuery;
  loading: boolean;
  isDisabled: boolean;
  form: {
    slug: TextInputProps;
  };
};

export const EditRoomForm: React.VFC = () => {};
