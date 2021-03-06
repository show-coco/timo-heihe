import React from "react";
import { RoomOperationCardList } from "../../../components/room-operation-card/list";
import { ManagerRoomsTemplate } from "../../../components/template/manager-rooms";
import {
  MemberState,
  useRoomManagementPageQuery,
} from "../../../generated/types";

export default function Owner() {
  const { data, loading } = useRoomManagementPageQuery({
    variables: { memberState: MemberState.Joining, iAmOwner: true },
  });

  return (
    <ManagerRoomsTemplate>
      {loading ? (
        <p>Loading...</p>
      ) : data && data.myRooms.length ? (
        <RoomOperationCardList rooms={data.myRooms} />
      ) : (
        <>
          <p>あなたがオーナーをしているルームがありません。</p>
          <p>ルームを作成するとオーナーになることができます。</p>
        </>
      )}
    </ManagerRoomsTemplate>
  );
}
