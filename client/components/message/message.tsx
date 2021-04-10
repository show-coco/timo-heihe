import React from "react";
import { MessageFragment } from "../../generated/types";
import { Avatar } from "../avatar/avatar";

type Props = MessageFragment & {
  opponentSlug?: string;
};

export const MessageItem: React.FC<Props> = (props: Props) => {
  return (
    <div key={props.id}>
      {props.opponentSlug === props.sender.userId ? (
        <div className="flex items-center w-1/2 my-3 space-x-3">
          <Avatar src={props.sender.avatar || ""} size="small" />
          <div className="max-w-full px-2 py-1 break-words bg-gray-200 rounded-sm">
            {props.text}
          </div>
        </div>
      ) : (
        <div className="flex justify-end my-3">
          <div className="px-2 py-1 break-words bg-pink-200 rounded-sm max-w-1/2">
            {props.text}
          </div>
        </div>
      )}
    </div>
  );
};
