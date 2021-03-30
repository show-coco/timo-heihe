import React from "react";
import { Heading } from "../components/heading/heading";
import { MessageTimeline } from "../components/message/message-timeline";
import { Template } from "../components/template/app/template";
import {
  MessageTimelineFragment,
  useMessageTimelinesQuery,
} from "../generated/types";

export default function MessagesPage() {
  const { data, error } = useMessageTimelinesQuery();

  if (error) console.error(error);

  if (!data) return <p>データが存在しません</p>;

  const users = data.myRooms
    .flatMap((room) => room.applyingUsers)
    .flatMap((applyingUsers) => applyingUsers?.user);

  return (
    <Template>
      <div className="flex m-auto min-h-mobile md:p-10 md:min-h-pc md:w-4/5">
        <div className="flex w-full bg-white border">
          <MessageTimeline users={users} />

          <div>message</div>
        </div>
      </div>
    </Template>
  );
}
