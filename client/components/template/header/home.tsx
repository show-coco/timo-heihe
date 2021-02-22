import React from "react";
import { IconButton } from "../../button/icon-button";
import DotIcon from "../../../assets/icons/dot-set.svg";
import MorningIcon from "../../../assets/icons/morning.svg";
import { Button } from "../../button";
import { TeamTypesFragment } from "../../../generated/types";
import { Card } from "../../card/card";
import { AvatarLink } from "../../avatar/avatar-link";

type Props = {
  teamTypes?: TeamTypesFragment[];
  typeId: number;
  setTypeId: React.Dispatch<React.SetStateAction<number>>;
};

export const HomeHeader: React.FC<Props> = ({
  teamTypes,
  typeId,
  setTypeId,
}: Props) => {
  return (
    <>
      <div className="w-10/12 m-auto h-44 flex flex-row px-6">
        <div className="flex items-center flex-1 mr-5">
          <Card
            variant="shadow"
            className="flex flex-1 items-center pl-6 h-20 justify-between"
          >
            <p className="text-lg">
              x月xx日にハッカソンが開催されます！腕試ししてみませんか
            </p>
            <MorningIcon class="h-full" />
          </Card>
        </div>
      </div>

      <div className="space-x-3 bg-white w-full px-6">
        {teamTypes?.map((type) => {
          const isSelected = typeId === type.id;
          return (
            <Button
              roundedTop={true}
              key={type.id}
              variant={isSelected ? "underline" : "ghost"}
              className={
                isSelected
                  ? "text-black-400"
                  : "text-black-100 hover:text-black-400"
              }
              onClick={() => setTypeId(type.id)}
            >
              {type.name}
            </Button>
          );
        })}
      </div>
    </>
  );
};
