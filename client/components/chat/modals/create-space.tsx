import React from "react";
import { UseCreateSpaceReturn } from "../../../hooks/useCreateSpace";
import { Avatar } from "../../avatar/avatar";
import { Button } from "../../button";
import { FileInput } from "../../file-input/file-inpute";
import { Heading } from "../../heading/heading";
import { Modal } from "../../modal/modal";
import { TextInput } from "../../text-input/text-input";

type Props = UseCreateSpaceReturn;

export const CreateSpaceModal: React.FC<Props> = (props: Props) => {
  return (
    <Modal
      isOpen={props.modal.isOpen}
      onRequestClose={props.modal.onClose}
      style={{
        content: {
          width: "35%",
        },
      }}
    >
      <Heading as="h1Small" className="mb-5">
        スペースを作成する
      </Heading>
      <form className="mt-3 space-y-5" onSubmit={props.onSubmit}>
        <div>
          <div>チームアイコン</div>

          <div className="flex items-center space-x-7">
            <Avatar src={props.fileInput.imageUrl} name={props.title} />

            <FileInput
              ref={props.fileInput.fileRef}
              onClick={props.fileInput.onClick}
              onChange={props.fileInput.onChange}
            />
          </div>
        </div>
        <div>
          <div className="mb-2">スペース名</div>
          <TextInput
            className="w-full"
            onChange={(e) => props.setTitle(e.target.value)}
          />
        </div>

        <div>
          <div className="mb-2">説明（任意）</div>
          <TextInput
            className="w-full"
            onChange={(e) => props.setDescription(e.target.value)}
          />
        </div>

        <div className="mt-4 flex justify-end space-x-3">
          <Button onClick={props.modal.onClose} variant="ghost">
            キャンセル
          </Button>
          <Button type="submit">作成</Button>
        </div>
      </form>
    </Modal>
  );
};
