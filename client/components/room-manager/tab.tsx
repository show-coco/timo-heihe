import React from "react";
import { Tab } from "../tab";

export const TabForRoomManager: React.FC = () => {
  return (
    <Tab
      links={[
        { name: "オーナー", path: "/manager/rooms/owner" },
        { name: "参加中", path: "/manager/rooms/joining" },
        { name: "申請中", path: "/manager/rooms/applying" },
      ]}
    />
  );
};
