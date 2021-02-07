import React from "react";
import { Template } from "../components/template/template";
import { useAuthContext } from "../providers/useAuthContext";

export default function ChatPage() {
  const { id } = useAuthContext();

  console.log(id);

  return (
    <Template>
      <div className="grid grid-cols-chat h-full border-gray-200 border bg-white">
        <div className="grid border-gray-200 border-r"></div>
        <div className="grid border-gray-200 border-r"></div>
        <div className="grid"></div>
      </div>
    </Template>
  );
}
