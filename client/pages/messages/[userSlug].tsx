import { useRouter } from "next/router";
import React from "react";
import { Avatar } from "../../components/avatar/avatar";
import { MessagesTemplate } from "../../components/template/messages";
import { useMessagesQuery } from "../../generated/types";
import { useMessageUsers } from "../../hooks/useMessageUsers";

export default function Message() {
  const router = useRouter();
  const slug = router.query.userSlug;
  const { users } = useMessageUsers();

  const { data, loading, error } = useMessagesQuery({
    variables: {
      opponentSlug: slug?.toString() || "",
    },
  });

  if (error) console.error(error);

  return (
    <MessagesTemplate users={users}>
      <div>
        {data?.messages.map((message) => (
          <div key={message.id}>{message.text}</div>
        ))}
      </div>
    </MessagesTemplate>
  );
}
