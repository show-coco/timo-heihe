import React from "react";
import { ReactComponent as EditPen } from "../../../assets/icons/plane-pen.svg";
import { Tooltip } from "../../tooltip/tooltip";

type Props = {
  className?: string;
};

export const ChatOperations: React.FC<Props> = ({ className }: Props) => {
  return (
    <div
      className={`rounded-md p-1 w-min chat-operations border flex space-x-4 ${className}`}
    >
      <button className="tool h-6 w-6 p-1">
        <EditPen />
      </button>
      {/* FIXME: なぜかツールチップが表示されない 参考: https://zenn.dev/catnose99/articles/26bd8dac9ea5268486c8 */}
      <Tooltip>編集する</Tooltip>
    </div>
  );
};
