import React from "react";
import { MessageTimelineFragment } from "../../generated/types";
import { Avatar } from "../avatar/avatar";
import { Ellipsis } from "../ellipsis";

type Props = {
  users: (MessageTimelineFragment | undefined)[];
};

export const MessageTimeline: React.FC<Props> = ({ users }: Props) => {
  return (
    <div className="w-full overflow-y-scroll border-r divide-y md:w-60">
      {users.map((user) => {
        return user ? (
          <div key={user?.id} className="flex items-center h-16 px-3">
            <Avatar src={user?.avatar || ""} name={user?.name} size="small" />

            <div className="ml-3">
              <div className="flex justify-between">
                <Ellipsis className="w-2/3 font-bold">veavenivaneivne</Ellipsis>
                <span className="w-1/3 text-sm">7月21日</span>
              </div>
              <Ellipsis className="w-32 text-sm">
                最新のメッセージですaa
              </Ellipsis>
            </div>
          </div>
        ) : (
          <div></div>
        );
      })}

      <div></div>
    </div>
  );
};
