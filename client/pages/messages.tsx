import React from "react";
import { MessagesTemplate } from "../components/template/messages";

export default function MessagesPage() {
  return (
    <MessagesTemplate>
      <div className="flex items-center justify-center h-full font-bold">
        選択したメッセージはありません
      </div>
    </MessagesTemplate>
  );
}
