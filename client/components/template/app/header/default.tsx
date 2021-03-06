import React from "react";
import DotIcon from "../../../assets/icons/dot-set.svg";
import { IconButton } from "../../../button/icon-button";
import { Avatar } from "../../../avatar/avatar";

export const DefaultHeader: React.FC = () => {
  return (
    <div className="flex overflow-hidden bg-blue-100 h-70px">
      <div className="flex items-center justify-end flex-1 pr-6 space-x-6">
        <IconButton
          icon={<DotIcon width="30px" height="30px" fill="#555555" />}
          variant="ghost"
        />
        <Avatar
          src="https://bit.ly/kent-c-dodds"
          className="cursor-pointer hover:opacity-80"
        />
      </div>
    </div>
  );
};
