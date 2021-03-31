import React from "react";
import { MessageTimelineItem } from "./item";

type Props = {
  users: React.ComponentProps<typeof MessageTimelineItem>["user"][];
};

export const MessageTimeline: React.FC<Props> = ({ users }: Props) => {
  return (
    <div className="w-full overflow-y-scroll border-r divide-y md:w-1/4">
      {users.map((user) => (
        <MessageTimelineItem user={user} key={user?.id} />
      ))}

      {/* This div is for displaying line by divide */}
      <div></div>
    </div>
  );
};
