import React from "react";
import { RoomOperationCardList } from "../../../components/room-operation-card/list";
import { ManagerRoomsTemplate } from "../../../components/template/manager-rooms";
import {
  MemberState,
  useRoomManagementPageQuery,
} from "../../../generated/types";

export default function RoomManager() {
  const { data, loading } = useRoomManagementPageQuery({
    variables: { memberState: MemberState.Joining },
  });

  return (
    <ManagerRoomsTemplate>
      {loading ? (
        <p>Loading...</p>
      ) : data && data.myRooms.length ? (
        <RoomOperationCardList rooms={data.myRooms} />
      ) : (
        <p>参加中のルームがありません</p>
      )}
    </ManagerRoomsTemplate>
  );
}
