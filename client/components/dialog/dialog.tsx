import React from "react";
import ReactModal from "react-modal";

export type DialogProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: (
    // eslint-disable-next-line no-unused-vars
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void;
};

const customStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.2)",
  },
};

export const Dialog: React.FC<DialogProps> = ({
  children,
  isOpen,
  onClose,
}: DialogProps) => {
  return (
    <ReactModal isOpen={isOpen} style={customStyle} onRequestClose={onClose}>
      {children}
    </ReactModal>
  );
};
