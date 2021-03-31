import { useRouter } from "next/router";
import React from "react";
import { MessagesTemplate } from "../../components/template/messages";

export default function Message() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <MessagesTemplate>
      <div>message {id}</div>
    </MessagesTemplate>
  );
}
