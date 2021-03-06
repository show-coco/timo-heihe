import React from "react";
import { RoomOperationCard, RoomOperationCardProps } from "../item";

type Props = {
  rooms: RoomOperationCardProps[];
};

export const RoomOperationCardList: React.FC<Props> = ({ rooms }: Props) => {
  return (
    <div className="space-y-7">
      {rooms.map((room) => (
        <RoomOperationCard {...room} key={room.id} />
      ))}
    </div>
  );
};
