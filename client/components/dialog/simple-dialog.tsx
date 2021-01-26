import React from "react";
import { Button, ButtonProps } from "../button";
import { Heading } from "../heading/heading";
import { Dialog, DialogProps } from "./dialog";

type Props = Pick<DialogProps, "isOpen" | "onClose"> & {
  onClick: ButtonProps["onClick"];
  title: string;
  buttonText: string;
};

export const SimpleDialog: React.FC<Props> = ({
  onClick,
  title,
  buttonText,
  ...rest
}: Props) => {
  return (
    <Dialog {...rest}>
      <div className="p-2 text-center space-y-4">
        <Heading as="h1Small">{title}</Heading>
        <div>
          <Button onClick={onClick}>{buttonText}</Button>
        </div>
      </div>
    </Dialog>
  );
};
