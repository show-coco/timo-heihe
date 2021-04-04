import React from "react";
import { MessagesTemplate } from "../components/template/messages";
import { useMessageUsers } from "../hooks/useMessageUsers";

export default function MessagesPage() {
  const { users } = useMessageUsers();

  return (
    <MessagesTemplate users={users}>
      <div className="flex items-center justify-center h-full font-bold">
        選択したメッセージはありません
      </div>
    </MessagesTemplate>
  );
}
