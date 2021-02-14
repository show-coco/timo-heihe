import { useState } from "react";

export type UseModalReturn = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};

export const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return {
    onOpen,
    onClose,
    isOpen,
  };
};
