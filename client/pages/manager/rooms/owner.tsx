// import Link from "next/link";
// import React from "react";
// import { Button } from "../../../components/button";
// import { RoomOperationCardList } from "../../../components/room-operation-card/list";
// import { ManagerRoomsTemplate } from "../../../components/template/manager-rooms";
// import { RoomOperationCardFragment } from "../../../generated/types";

// export default function Owner() {
//   const { data, loading } = useRoomManagementPageQuery({
//     variables: { memberState: MemberState.Joining, iAmOwner: true },
//   });

//   return (
//     <ManagerRoomsTemplate>
//       {loading ? (
//         <p>Loading...</p>
//       ) : data && data.myRooms.length ? (
//         <RoomOperationCardList rooms={data.myRooms} ButtonGroup={ButtonGroup} />
//       ) : (
//         <>
//           <p>あなたがオーナーをしているルームがありません。</p>
//           <p>ルームを作成するとオーナーになることができます。</p>
//         </>
//       )}
//     </ManagerRoomsTemplate>
//   );
// }

// const ButtonGroup: React.FC<RoomOperationCardFragment> = (
//   props: RoomOperationCardFragment
// ) => {
//   return (
//     <>
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
