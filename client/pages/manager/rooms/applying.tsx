import Link from "next/link";
import React from "react";
import { Button } from "../../../components/button";
import { RoomOperationCardList } from "../../../components/room-operation-card/list";
import { ManagerRoomsTemplate } from "../../../components/template/manager-rooms";

import {
  MemberState,
  RoomManagementPageDocument,
  RoomManagementPageQuery,
  RoomManagementPageQueryVariables,
  RoomOperationCardFragment,
  useCancelApplyingMutation,
  useRoomManagementPageQuery,
} from "../../../generated/types";
import { useAuthContext } from "../../../providers/useAuthContext";

export default function Applying() {
  const { data, loading } = useRoomManagementPageQuery({
    variables: { memberState: MemberState.Pending },
  });

  return (
    <>
      <ManagerRoomsTemplate>
        {loading ? (
          <p>Loading...</p>
        ) : data && data.myRooms.length ? (
          <RoomOperationCardList
            rooms={data.myRooms}
            ButtonGroup={ButtonGroup}
          />
        ) : (
          <p>申請中のルームがありません</p>
        )}
      </ManagerRoomsTemplate>
    </>
  );
}
const ButtonGroup: React.FC<RoomOperationCardFragment> = (
  props: RoomOperationCardFragment
) => {
  const [cancel] = useCancelApplyingMutation({
    update: (cache) => {
      const existingApplying = cache.readQuery<
        RoomManagementPageQuery,
        RoomManagementPageQueryVariables
      >({
        query: RoomManagementPageDocument,
        variables: { memberState: MemberState.Pending },
      });

      const newApplying = existingApplying?.myRooms.filter(
        (room) => room.id !== props.id
      );

      cache.writeQuery<
        RoomManagementPageQuery,
        RoomManagementPageQueryVariables
      >({
        query: RoomManagementPageDocument,
        data: { myRooms: newApplying || [] },
        variables: { memberState: MemberState.Pending },
      });
    },
  });
  const { id } = useAuthContext();

  return (
    <>
      <Button
        variant="outline"
        colorScheme="red"
        onClick={() =>
          cancel({ variables: { userId: id, roomId: props.id || 0 } })
        }
      >
        キャンセル
      </Button>

      <Link href="/dashboard/:slug" as={`/dashboard/${props.slug}`}>
        <Button variant="outline" colorScheme="blue">
          詳細
        </Button>
      </Link>

      <Link href="/room/:slug" as={`/room/${props.slug}`}>
        <Button variant="outline" colorScheme="orange">
          募集ページ
        </Button>
      </Link>
    </>
  );
};
