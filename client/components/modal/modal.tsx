import React from "react";
import ReactModal from "react-modal";

type Props = React.ComponentProps<typeof ReactModal> & {
  children: React.ReactNode;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const Modal: React.FC<Props> = ({
  children,
  style = {},
  ...props
}: Props) => {
  const styles = {
    content: {
      ...style.content,
      ...customStyles.content,
    },
    overlay: {
      ...style.overlay,
    },
  };

  return (
    <ReactModal style={styles} {...props}>
      {children}
    </ReactModal>
  );
};
