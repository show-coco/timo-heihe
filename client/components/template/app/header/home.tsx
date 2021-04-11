import React from "react";
// import MorningIcon from "../../../../assets/icons/morning.svg";
import { Button } from "../../../button";
import { RoomTypesFragment } from "../../../../generated/types";
import { Card } from "../../../card/card";
import { useAuthContext } from "../../../../providers/useAuthContext";
import { useModal } from "../../../../hooks/useModal";
import { LoginModal } from "../../../login-modal";

type Props = {
  teamTypes?: RoomTypesFragment[];
  typeId: number | undefined;
  setTypeId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const HomeHeader: React.FC<Props> = ({
  teamTypes,
  typeId,
  setTypeId,
}: Props) => {
  const { isAuthenticated } = useAuthContext();
  const { isOpen, onClose, onOpen } = useModal();

  return (
    <>
      <LoginModal onRequestClose={onClose} isOpen={isOpen} />

      {!isAuthenticated && (
        <div className="flex flex-row items-center px-6 m-auto md:w-10/12 h-44">
          <Card className="items-center justify-between w-full md:flex md:shadow-lg">
            <div className="pb-5 text-lg text-center md:pb-0 md:flex">
              <p className="font-bold md:font-normal">こんにちはゲストさん！</p>
              <p>ログインしてルームに参加しよう</p>
            </div>
            <Button
              colorScheme="blue"
              onClick={onOpen}
              className="w-full shadow-lg md:w-32"
            >
              Login
            </Button>
          </Card>
        </div>
      )}

      <div className="w-full px-32 space-x-3 bg-white">
        <Button
          roundedTop={true}
          variant={typeId === undefined ? "underline" : "ghost"}
          className={
            typeId === undefined
              ? "text-black-400  "
              : "text-black-100 hover:text-black-400"
          }
          onClick={() => setTypeId(undefined)}
        >
          全て
        </Button>
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
