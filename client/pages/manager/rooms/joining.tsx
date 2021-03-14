// import Link from "next/link";
// import React from "react";
// import { Button } from "../../../components/button";
// import { RoomOperationCardList } from "../../../components/room-operation-card/list";
// import { ManagerRoomsTemplate } from "../../../components/template/manager-rooms";
// import {
//   MemberState,
//   RoomManagementPageDocument,
//   RoomManagementPageQuery,
//   RoomManagementPageQueryVariables,
//   RoomOperationCardFragment,
//   useLeaveRoomMutation,
//   useRoomManagementPageQuery,
// } from "../../../generated/types";
// import { useAuthContext } from "../../../providers/useAuthContext";

// export default function RoomManager() {
//   const { data, loading } = useRoomManagementPageQuery({
//     variables: { memberState: MemberState.Joining },
//   });

//   return (
//     <ManagerRoomsTemplate>
//       {loading ? (
//         <p>Loading...</p>
//       ) : data && data.myRooms.length ? (
//         <RoomOperationCardList rooms={data.myRooms} ButtonGroup={ButtonGroup} />
//       ) : (
//         <p>参加中のルームがありません</p>
//       )}
//     </ManagerRoomsTemplate>
//   );
// }

// const ButtonGroup: React.FC<RoomOperationCardFragment> = (
//   props: RoomOperationCardFragment
// ) => {
//   const [leaveRoom] = useLeaveRoomMutation({
//     update: (cache) => {
//       const exisitingRooms = cache.readQuery<
//         RoomManagementPageQuery,
//         RoomManagementPageQueryVariables
//       >({
//         query: RoomManagementPageDocument,
//         variables: { memberState: MemberState.Joining },
//       });

//       const newRooms = exisitingRooms?.myRooms.filter(
//         (room) => room.id !== props.id
//       );

//       cache.writeQuery<
//         RoomManagementPageQuery,
//         RoomManagementPageQueryVariables
//       >({
//         query: RoomManagementPageDocument,
//         data: { myRooms: newRooms || [] },
//         variables: { memberState: MemberState.Joining },
//       });
//     },
//   });
//   const { id } = useAuthContext();

//   return (
//     <>
//       <Button
//         variant="outline"
//         colorScheme="red"
//         onClick={() =>
//           leaveRoom({ variables: { roomId: props.id || 0, userId: id } })
//         }
//       >
//         脱退
//       </Button>

//       <Link href="/dashboard/:slug" as={`/dashboard/${props.slug}`}>
//         <Button variant="outline" colorScheme="blue">
//           詳細
//         </Button>
//       </Link>

//       <Link href="/room/:slug" as={`/room/${props.slug}`}>
//         <Button variant="outline" colorScheme="orange">
//           募集ページ
//         </Button>
//       </Link>
//     </>
//   );
// };
