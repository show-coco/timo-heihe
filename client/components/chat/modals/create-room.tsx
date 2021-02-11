import React from "react";
import { Button } from "../../button";
import { Heading } from "../../heading/heading";
import { Modal } from "../../modal/modal";
import { TextInput } from "../../text-input/text-input";

type Props = {
  isOpen: boolean;
  roomName: string;
  onClose: () => void;
  onCreate: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CreateRoomModal: React.FC<Props> = ({
  isOpen,
  roomName,
  onClose,
  onCreate,
  onChangeName,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          width: "35%",
        },
      }}
    >
      <Heading as="h1Small">ルームを作成する</Heading>
      <div className="mt-3">
        <div className="mb-2">ルーム名</div>
        <TextInput className="w-full" onChange={onChangeName} />

        <div className="mt-4 flex justify-end space-x-3">
          <Button onClick={onClose} variant="ghost">
            キャンセル
          </Button>
          <Button onClick={onCreate} disabled={roomName.length === 0}>
            作成
          </Button>
        </div>
      </div>
    </Modal>
  );
};
