import React from "react";
import { ReactComponent as EditPen } from "../../../assets/icons/plane-pen.svg";

type Props = {
  className?: string;
};

export const ChatOperations: React.FC<Props> = ({ className }: Props) => {
  return (
    <div
      className={`rounded-md p-1 w-min chat-operations border flex space-x-4 ${className}`}
    >
      <button className="h-6 w-6 p-1">
        <EditPen />
      </button>
    </div>
  );
};
