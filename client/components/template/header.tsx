import React from "react";
import DotIcon from "../../assets/icons/dot-set.svg";
import { IconButton } from "../button/icon-button";

export const Header: React.FC = () => {
  return (
    <div className="h-70px flex">
      <div>Hirosaa</div>
      <div>
        <IconButton
          icon={<DotIcon width="30px" height="30px" />}
          variant="ghost"
          className="hover:bg-orange-500"
        />
      </div>
    </div>
  );
};
