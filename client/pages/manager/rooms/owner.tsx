import React from "react";
import { Heading } from "../../../components/heading/heading";
import { TabForRoomManager } from "../../../components/room-manager/tab";
import { Sidebar } from "../../../components/template/sidebar";
import { Template } from "../../../components/template/template";

export default function Owner() {
  return (
    <Template>
      <div className="flex flex-row">
        <Sidebar />
        <div className="p-10">
          <Heading as="h1Small" className="mb-5">
            ルーム管理
          </Heading>
          <TabForRoomManager />
        </div>
      </div>
    </Template>
  );
}
