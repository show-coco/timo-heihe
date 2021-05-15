import React from "react";
import { RoomCardFragment } from "../../generated/types";
import { RoomCard } from "../card";

type Props = {
  rooms: RoomCardFragment[] | undefined;
  loading: boolean;
  className?: string;
};

export const RoomCardList: React.VFC<Props> = ({
  rooms,
  loading,
  className,
}: Props) => {
  if (!rooms || (rooms.length === 0 && !loading)) {
    return <p className="text-lg font-bold text-center">ルームがありません</p>;
  }

  return (
    <div className={`space-y-5 ${className}`}>
      {rooms.map((team, i) => (
        <RoomCard {...team} key={i} />
      ))}
    </div>
  );
};
