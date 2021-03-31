import React from "react";
import { useMessageTimelinesQuery } from "../../../generated/types";
import { MessageTimeline } from "../../message/message-timeline";
import { Template } from "../app/template";

type Props = {
  children: React.ReactNode;
};

export const MessagesTemplate: React.FC<Props> = ({ children }: Props) => {
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

          {children}
        </div>
      </div>
    </Template>
  );
};
