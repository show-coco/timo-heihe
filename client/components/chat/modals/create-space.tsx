import React from "react";
import { useFileInput } from "../../../hooks/useFileInput";
import { Avatar } from "../../avatar/avatar";
import { Button } from "../../button";
import { FileInput } from "../../file-input/file-inpute";
import { Heading } from "../../heading/heading";
import { Modal } from "../../modal/modal";
import { TextInput } from "../../text-input/text-input";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateSpaceModal: React.FC<Props> = ({
  isOpen,
  onClose,
}: Props) => {
  const {
    fileRef,
    onClick: onClickFileInput,
    onChange: onChangeFileInput,
    imageUrl,
  } = useFileInput();

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
      <Heading as="h1Small" className="mb-5">
        スペースを作成する
      </Heading>
      <div className="mt-3 space-y-5">
        <div>
          <div>チームアイコン</div>

          <div className="flex items-center space-x-7">
            <Avatar src={imageUrl} name="space name" />

            <FileInput
              ref={fileRef}
              onClick={onClickFileInput}
              onChange={onChangeFileInput}
            />
          </div>
        </div>
        <div>
          <div className="mb-2">スペース名</div>
          <TextInput className="w-full" />
        </div>

        <div>
          <div className="mb-2">説明（任意）</div>
          <TextInput className="w-full" />
        </div>

        <div className="mt-4 flex justify-end space-x-3">
          <Button onClick={onClose} variant="ghost">
            キャンセル
          </Button>
          <Button>作成</Button>
        </div>
      </div>
    </Modal>
  );
};
