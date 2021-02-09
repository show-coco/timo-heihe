import React from "react";
import { SpaceItemFragment } from "../../generated/types";
import { Avatar } from "../avatar/avatar";

type Props = {
  teams?: SpaceItemFragment[];
  setSelectedSpace: React.Dispatch<React.SetStateAction<number>>;
};

export const SpaceList: React.FC<Props> = ({
  teams,
  setSelectedSpace,
}: Props) => {
  return (
    <div className="flex items-center flex-col border-gray-200 border-r space-y-5 py-5">
      {teams?.map((team) => (
        <Avatar
          src={team.icon || ""}
          name={team.title}
          key={team.id}
          variant="square"
          onClick={() => setSelectedSpace(team.id || 0)}
          className="cursor-pointer"
        />
      ))}
    </div>
  );
};
