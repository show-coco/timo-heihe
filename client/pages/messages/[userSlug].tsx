import { useRouter } from "next/router";
import React from "react";
import { Avatar } from "../../components/avatar/avatar";
import { MessageItem } from "../../components/message/message";
import { MessagesTemplate } from "../../components/template/messages";
import { UserInfo } from "../../components/user-info/user-info";
import { useMessagesQuery, useOpponentUserQuery } from "../../generated/types";
import { useMessageUsers } from "../../hooks/useMessageUsers";

export default function Message() {
  const router = useRouter();
  const slug = router.query.userSlug;
  const { users } = useMessageUsers();

  const { data: messageData, error } = useMessagesQuery({
    variables: {
      opponentSlug: slug?.toString() || "",
    },
  });
  const { data: opponentData, loading } = useOpponentUserQuery({
    variables: {
      slug: slug?.toString() || "",
    },
  });

  if (error) console.error(error);

  return (
    <MessagesTemplate users={users}>
      <div className="divide-y">
        {loading ? (
          <div className="h-16">Loading...</div>
        ) : opponentData ? (
          <UserInfo {...opponentData.user} className="h-16 ml-5" />
        ) : (
          <div>情報が取得できませんでした</div>
        )}

        <div className="px-5">
          {messageData?.messages.map((message) => (
            <MessageItem
              {...message}
              key={message.id}
              opponentSlug={slug?.toString()}
            />
          ))}
        </div>
      </div>
    </MessagesTemplate>
  );
}
