import React from "react";
import MorningIcon from "../../../assets/icons/morning.svg";
import { Button } from "../../button";
import { RoomTypesFragment } from "../../../generated/types";
import { Card } from "../../card/card";
import { useAuthContext } from "../../../providers/useAuthContext";
import Link from "next/link";

type Props = {
  teamTypes?: RoomTypesFragment[];
  typeId: number;
  setTypeId: React.Dispatch<React.SetStateAction<number>>;
};

const LoginNotification: React.FC = () => {
  return (
    <div className="flex items-center space-x-20">
      <p className="text-lg">
        こんにちはゲストさん！ログインしてルームに参加しよう
      </p>
      <Button colorScheme="blue">Login</Button>
    </div>
  );
};

const Notification = {
  LOGIN: <LoginNotification />,
  HACKASON: (
    <p className="text-lg">
      x月xx日にハッカソンが開催されます！腕試ししてみませんか
    </p>
  ),
};

export const HomeHeader: React.FC<Props> = ({
  teamTypes,
  typeId,
  setTypeId,
}: Props) => {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <div className="flex flex-row w-10/12 px-6 m-auto h-44">
        <div className="flex items-center flex-1 mr-5">
          <Card
            variant="shadow"
            className="flex items-center justify-between flex-1 h-20 pl-6"
          >
            {isAuthenticated ? Notification["HACKASON"] : Notification["LOGIN"]}
            <MorningIcon class="h-full" />
          </Card>
        </div>
      </div>

      <div className="w-full px-32 space-x-3 bg-white">
        {teamTypes?.map((type) => {
          const isSelected = typeId === type.id;
          return (
            <Button
              roundedTop={true}
              key={type.id}
              variant={isSelected ? "underline" : "ghost"}
              className={
                isSelected
                  ? "text-black-400  "
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
