import React from "react";
import { RoomItemFragment } from "../../generated/types";

type Props = {
  rooms: RoomItemFragment["rooms"];
  setSelectedRoomId: React.Dispatch<React.SetStateAction<number>>;
};

export const RoomList: React.FC<Props> = ({
  rooms,
  setSelectedRoomId,
}: Props) => {
  const roomDoesntExists = rooms?.length === 0;

  if (roomDoesntExists) {
    return <p className="text-center mt-2">ルームが存在しません</p>;
  }

  return (
    <div className="flex-1">
      {rooms?.map((room) => (
        <div
          key={room.id}
          className="p-3 hover:bg-opacity-20 hover:bg-black-400"
          onClick={() => setSelectedRoomId(room.id)}
        >
          #{room.name}
        </div>
      ))}
    </div>
  );
};
