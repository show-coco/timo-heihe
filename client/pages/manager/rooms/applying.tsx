import React from "react";
import { RoomOperationCardList } from "../../../components/room-operation-card/list";
import { ManagerRoomsTemplate } from "../../../components/template/manager-rooms";

import {
  MemberState,
  useRoomManagementPageQuery,
} from "../../../generated/types";

export default function Applying() {
  const { data, loading } = useRoomManagementPageQuery({
    variables: { memberState: MemberState.Pending },
  });

  return (
    <ManagerRoomsTemplate>
      {loading ? (
        <p>Loading...</p>
      ) : data && data.myRooms.length ? (
        <RoomOperationCardList rooms={data.myRooms} />
      ) : (
        <p>申請中のルームがありません</p>
      )}
    </ManagerRoomsTemplate>
  );
}
