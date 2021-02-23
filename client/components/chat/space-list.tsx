import React from "react";
import { RoomItemFragment } from "../../generated/types";
import { Avatar } from "../avatar/avatar";

type Props = {
  rooms?: RoomItemFragment[];
  setSelectedRoom: React.Dispatch<React.SetStateAction<number>>;
  onOpen: () => void;
};

export const SpaceList: React.FC<Props> = ({
  rooms,
  setSelectedRoom: setSelectedSpace,
  onOpen,
}: Props) => {
  return (
    <>
      <div className="flex items-center flex-col border-gray-200 border-r space-y-3 py-5">
        {rooms?.map((room) => (
          <Avatar
            src={room.icon || ""}
            key={room.id}
            name={room.title}
            variant="square"
            onClick={() => setSelectedSpace(room.id || 0)}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
          />
        ))}

        <button className="h-12 w-12 rounded-md bg-gray-300" onClick={onOpen}>
          <span className="text-white">＋</span>
        </button>
      </div>
    </>
  );
};
