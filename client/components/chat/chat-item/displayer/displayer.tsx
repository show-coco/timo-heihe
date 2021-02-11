import React from "react";
import { ChatItemFragment } from "../../../../generated/types";
import {
  dateFormatter,
  YEAR_MONTH_DAY_HOUR_MIN,
} from "../../../../utils/dateFormat";
import { Avatar } from "../../../avatar/avatar";

type Props = {
  item: ChatItemFragment;
};

export const ChatItemDisplayer: React.FC<Props> = ({ item }: Props) => {
  return (
    <>
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
    </>
  );
};
