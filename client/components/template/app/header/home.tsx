import React from "react";
import MorningIcon from "../../../../assets/icons/morning.svg";
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

const LoginNotification: React.FC<{ onOpen: () => void }> = ({
  onOpen,
}: {
  onOpen: () => void;
}) => {
  return (
    <div className="flex items-center space-x-20">
      <p className="text-lg">
        こんにちはゲストさん！ログインしてルームに参加しよう
      </p>
      <Button colorScheme="blue" onClick={onOpen}>
        Login
      </Button>
    </div>
  );
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

      <div className="flex flex-row w-10/12 px-6 m-auto h-44">
        <div className="flex items-center flex-1 mr-5">
          <Card
            variant="shadow"
            className="flex items-center justify-between flex-1 h-20 pl-6"
          >
            {isAuthenticated ? (
              <p className="text-lg">
                x月xx日にハッカソンが開催されます！腕試ししてみませんか
              </p>
            ) : (
              <LoginNotification onOpen={onOpen} />
            )}
            <MorningIcon class="h-full" />
          </Card>
        </div>
      </div>

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
