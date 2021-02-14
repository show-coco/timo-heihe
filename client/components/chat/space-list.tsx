import React from "react";
import { SpaceItemFragment } from "../../generated/types";
import { Avatar } from "../avatar/avatar";

type Props = {
  teams?: SpaceItemFragment[];
  setSelectedSpace: React.Dispatch<React.SetStateAction<number>>;
  onOpen: () => void;
};

export const SpaceList: React.FC<Props> = ({
  teams,
  setSelectedSpace,
  onOpen,
}: Props) => {
  return (
    <>
      <div className="flex items-center flex-col border-gray-200 border-r space-y-3 py-5">
        {teams?.map((team) => (
          <Avatar
            src={team.icon || ""}
            key={team.id}
            name={team.title}
            variant="square"
            onClick={() => setSelectedSpace(team.id || 0)}
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
