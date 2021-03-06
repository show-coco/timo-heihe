import Link from "next/link";
import React from "react";
import { Button } from "../../../components/button";
import { RoomOperationCardList } from "../../../components/room-operation-card/list";
import { ManagerRoomsTemplate } from "../../../components/template/manager-rooms";

import {
  MemberState,
  RoomOperationCardFragment,
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
        <RoomOperationCardList rooms={data.myRooms} ButtonGroup={ButtonGroup} />
      ) : (
        <p>申請中のルームがありません</p>
      )}
    </ManagerRoomsTemplate>
  );
}
const ButtonGroup: React.FC<RoomOperationCardFragment> = (
  props: RoomOperationCardFragment
) => {
  return (
    <>
      <Button variant="outline" colorScheme="red">
        キャンセル
      </Button>

      <Link href="/room/:slug" as={`/room/${props.slug}`}>
        <Button variant="outline" colorScheme="orange">
          募集ページ
        </Button>
      </Link>
    </>
  );
};
