import React from "react";
import { UseMessageUsers } from "../../hooks/useMessageUsers";
import { MessageTimelineItem } from "./item";

type Props = {
  users: UseMessageUsers["users"];
  className?: string;
};

export const MessageTimeline: React.FC<Props> = ({
  users,
  className,
}: Props) => {
  return (
    <div
      className={`overflow-y-scroll border-r divide-y md:w-1/4 ${className}`}
    >
      {users.map((user) => (
        <MessageTimelineItem user={user} key={user?.id} />
      ))}

      {/* This div is for displaying line by divide */}
      <div></div>
    </div>
  );
};
