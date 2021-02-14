import React from "react";
import { Modal } from "../../modal/modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateSpaceModal: React.FC<Props> = ({
  isOpen,
  onClose,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      Hello
    </Modal>
  );
};
