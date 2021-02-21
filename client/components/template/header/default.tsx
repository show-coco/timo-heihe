import React from "react";
import DotIcon from "../../../assets/icons/dot-set.svg";
import { IconButton } from "../../button/icon-button";
import { Avatar } from "../../avatar/avatar";

export const DefaultHeader: React.FC = () => {
  return (
    <div className="h-70px flex overflow-hidden bg-blue-100">
      <div className="flex justify-end flex-1 items-center pr-6 space-x-6">
        <IconButton
          icon={<DotIcon width="30px" height="30px" fill="#555555" />}
          variant="ghost"
        />
        <Avatar
          src="https://bit.ly/kent-c-dodds"
          className="hover:opacity-80 cursor-pointer"
        />
      </div>
    </div>
  );
};
