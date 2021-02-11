import React from "react";
import { ChatItemFragment } from "../../../generated/types";
import {
  dateFormatter,
  YEAR_MONTH_DAY_HOUR_MIN,
} from "../../../utils/dateFormat";
import { Avatar } from "../../avatar/avatar";
import { ChatOperations } from "../chat-operations/chat-operations";

type Props = {
  item: ChatItemFragment;
};

export const ChatItem: React.FC<Props> = ({ item }: Props) => {
  return (
    <div className="chat-item flex hover:bg-black-100 hover:bg-opacity-10 p-2 relative">
      <ChatOperations className="absolute top-0 right-2" />
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
        <span className="ml-2">
          {dateFormatter(
            new Date(Date.parse(item.createdAt)),
            YEAR_MONTH_DAY_HOUR_MIN
          )}
        </span>

        <div>{item.text}</div>
      </div>
    </div>
  );
};
