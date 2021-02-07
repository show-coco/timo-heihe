import React from "react";
import { RoomItemFragment } from "../../generated/types";

type Props = {
  rooms: RoomItemFragment["rooms"];
};

export const RoomList: React.FC<Props> = ({ rooms }: Props) => {
  console.log("rooms", rooms);
  return (
    <div className="flex-1">
      {rooms?.map((room) => (
        <div
          key={room.id}
          className="p-3 hover:bg-opacity-20 hover:bg-black-400"
        >
          #{room.name}
        </div>
      ))}
    </div>
  );
};
