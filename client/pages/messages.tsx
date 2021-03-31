import React from "react";
import { MessagesTemplate } from "../components/template/messages";

export default function MessagesPage() {
  return (
    <MessagesTemplate>
      <div className="flex items-center justify-center w-3/4 font-bold">
        選択したメッセージはありません
      </div>
    </MessagesTemplate>
  );
}
