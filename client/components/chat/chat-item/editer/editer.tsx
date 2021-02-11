import React from "react";
import { Button } from "../../../button";
import { TextInput } from "../../../text-input/text-input";

type Props = {
  onClickCancel: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
};

export const ChatItemEditer: React.FC<Props> = ({
  onClickCancel,
  onChangeText,
  onClickSave,
  text,
}: Props) => {
  return (
    <div className="w-full">
      <div>
        <TextInput className="w-full" value={text} onChange={onChangeText} />
      </div>

      <div className="pt-2 space-x-2">
        <Button
          onClick={onClickCancel}
          className="text-xs"
          size="small"
          variant="ghost"
        >
          キャンセル
        </Button>
        <Button onClick={onClickSave} className="text-xs" size="small">
          変更を保存する
        </Button>
      </div>
    </div>
  );
};
