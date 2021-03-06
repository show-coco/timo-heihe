import React from "react";
import { Heading } from "../../heading/heading";
import { TabForRoomManager } from "../../room-manager/tab";
import { Sidebar } from "../app/sidebar";
import { Template } from "../app/template";

type Props = {
  children: React.ReactNode;
};

export const ManagerRoomsTemplate: React.FC<Props> = ({ children }: Props) => {
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

            {children}
          </div>
        </div>
      </div>
    </Template>
  );
};
