import React from "react";
import { ChatItemFragment } from "../../generated/types";
import { Avatar } from "../avatar/avatar";

type Props = {
  item: ChatItemFragment;
};

export const ChatItem: React.FC<Props> = ({ item }: Props) => {
  return (
    <div className="flex hover:bg-black-100 hover:bg-opacity-10 p-2">
      <div className="mr-2">
        <Avatar
          src={item.user.avatar || ""}
          name={item.user.name}
          size="small"
        />
      </div>
      <div className="flex-1">
        <span className="break-word font-bold">
          <a>{item.user.name}</a>
        </span>

        <div>{item.text}</div>
      </div>
    </div>
  );
};
