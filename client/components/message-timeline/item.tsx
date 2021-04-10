import Link from "next/link";
import React from "react";
import { MessageTimelineFragment } from "../../generated/types";
import { Avatar } from "../avatar/avatar";
import { Ellipsis } from "../ellipsis";

type Props = {
  user: MessageTimelineFragment | undefined;
};

export const MessageTimelineItem: React.FC<Props> = ({ user }: Props) => {
  return user ? (
    <Link href="/messages/[userSlug]" as={`/messages/${user.userId}`}>
      <div key={user.id} className="flex items-center h-16 px-3">
        <Avatar src={user.avatar || ""} name={user.name} size="small" />

        <div className="w-full ml-3">
          <div className="flex justify-between">
            <Ellipsis className="w-2/3 font-bold">{user.name}</Ellipsis>
            {/* TODO */}
            {/* <span className="w-1/3 text-sm">7月21日</span> */}
          </div>
          {/* <Ellipsis className="w-32 text-sm">最新のメッセージです</Ellipsis> */}
        </div>
      </div>
    </Link>
  ) : (
    <div>エラーが発生しています</div>
  );
};
