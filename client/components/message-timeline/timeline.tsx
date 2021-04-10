import React from "react";
import { UseMessageUsers } from "../../hooks/useMessageUsers";
import { MessageTimelineItem } from "./item";

type Props = {
  users: UseMessageUsers["users"];
};

export const MessageTimeline: React.FC<Props> = ({ users }: Props) => {
  return (
    <div className="w-full overflow-y-scroll border-r divide-y md:w-80">
      {users.map((user) => (
        <MessageTimelineItem user={user} key={user?.id} />
      ))}

      {/* This div is for displaying line by divide */}
      <div></div>
    </div>
  );
};
