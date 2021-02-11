import React from "react";
import { Button } from "../../../button";
import { TextInput } from "../../../text-input/text-input";

type Props = {
  onClickCancel: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  text: string;
  onChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ChatItemEditer: React.FC<Props> = ({
  onClickCancel,
  onChangeText,
  text,
}: Props) => {
  return (
    <div className="w-full">
      <div>
        <TextInput className="w-full" value={text} onChange={onChangeText} />
      </div>

      <div className="pt-2">
        <Button onClick={onClickCancel} className="text-xs" size="small">
          キャンセル
        </Button>
      </div>
    </div>
  );
};
