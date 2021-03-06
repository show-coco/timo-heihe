import React from "react";
import { RoomOperationCardFragment } from "../../../generated/types";
import { Avatar } from "../../avatar/avatar";
import { Heading } from "../../heading/heading";

export type RoomOperationCardProps = {
  room: RoomOperationCardFragment;
  ButtonGroup: React.FC<RoomOperationCardFragment>;
};

export const RoomOperationCard: React.FC<RoomOperationCardProps> = ({
  room,
  ButtonGroup,
}: RoomOperationCardProps) => {
  return (
    <div className="flex items-center w-full px-5 py-3 bg-white rounded-md">
      <Avatar src={room.icon || ""} name={room.name} />

      <div className="flex-1 px-3">
        <Heading as="h3">{room.name}</Heading>
        <div>@{room.slug}</div>
      </div>

      <div className="flex flex-row items-center space-x-3">
        <ButtonGroup {...room} />
      </div>
    </div>
  );
};
