import React from "react";
import { Heading } from "../../../components/heading/heading";
import { TabForRoomManager } from "../../../components/room-manager/tab";
import { RoomOperationCard } from "../../../components/room-operation-card";
import { Sidebar } from "../../../components/template/sidebar";
import { Template } from "../../../components/template/template";

export default function Owner() {
  return (
    <Template>
      <div className="flex flex-row">
        <Sidebar />

        <div className="flex-1 p-10">
          <div className="w-4/5">
            <Heading as="h1Small" className="mb-5">
              ルーム管理
            </Heading>

            <div className="mb-6">
              <TabForRoomManager />
            </div>

            <RoomOperationCard
              slug="test1"
              name="Test1"
              icon="http://flat-icon-design.com/f/f_object_158/s256_f_object_158_0bg.png"
              id={1}
            />
          </div>
        </div>
      </div>
    </Template>
  );
}
