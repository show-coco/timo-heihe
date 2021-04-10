import React from "react";
import { UseMessageUsers } from "../../../hooks/useMessageUsers";
import { MessageTimeline } from "../../message-timeline/timeline";
import { Template } from "../app/template";

type Props = {
  children: React.ReactNode;
  users: UseMessageUsers["users"];
};

export const MessagesTemplate: React.FC<Props> = ({
  children,
  users,
}: Props) => {
  return (
    <Template>
      <div className="flex m-auto min-h-mobile md:p-10 md:min-h-pc md:w-4/5">
        <div className="flex w-full bg-white border">
          <MessageTimeline users={users} />

          <div className="w-full">{children}</div>
        </div>
      </div>
    </Template>
  );
};
