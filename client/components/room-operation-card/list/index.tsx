import React from "react";
import { RoomOperationCardFragment } from "../../../generated/types";
import { RoomOperationCard, RoomOperationCardProps } from "../item";

type Props = {
  rooms: RoomOperationCardFragment[];
  ButtonGroup: React.FC<RoomOperationCardFragment>;
};

export const RoomOperationCardList: React.FC<Props> = ({
  rooms,
  ButtonGroup,
}: Props) => {
  return (
    <div className="space-y-7">
      {rooms.map((room) => (
        <RoomOperationCard
          room={room}
          key={room.id}
          ButtonGroup={ButtonGroup}
        />
      ))}
    </div>
  );
};
