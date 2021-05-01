import { useRouter } from "next/router";
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
  const router = useRouter();
  const messageLogPage = router.pathname === "/messages/[userSlug]";
  let onePage = typeof screen !== "undefined" && screen.width < 768;
  const timeLineStyle = onePage && messageLogPage ? "hidden" : "w-full";
  const messageLogStyle = onePage && !messageLogPage ? "hidden" : "w-full";

  return (
    <Template>
      <div className="flex m-auto min-h-mobile md:p-10 md:min-h-pc md:w-4/5">
        <div className={`flex bg-white border w-full`}>
          <MessageTimeline users={users} className={timeLineStyle} />

          <div className={`w-full md:w-3/4 ${messageLogStyle}`}>{children}</div>
        </div>
      </div>
    </Template>
  );
};
