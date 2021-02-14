import React from "react";
import { UseModalReturn } from "../../../hooks/useModal";
import { Button } from "../../button";
import { Heading } from "../../heading/heading";
import { Modal } from "../../modal/modal";

type Props = UseModalReturn & {
  onMoveToRecruit: () => void;
};

export const MoveToRecruitModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onMoveToRecruit,
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
      <div className="space-y-4">
        <Heading as="h1Small">スペースメンバーを募集しますか</Heading>

        <p>スペースメンバーを募集するための設定ページへ移動します。</p>

        <div className="mt-4 flex justify-end space-x-3">
          <Button onClick={onClose} variant="ghost">
            閉じる
          </Button>
          <Button onClick={onMoveToRecruit}>移動する</Button>
        </div>
      </div>
    </Modal>
  );
};
