import React from "react";
import { Button, ButtonProps } from "../button";
import { Heading } from "../heading/heading";
import { Dialog, DialogProps } from "./dialog";

type Props = Pick<DialogProps, "isOpen" | "onClose"> & {
  onClick: ButtonProps["onClick"];
};

export const LeaveTeamDialog: React.FC<Props> = ({
  onClick,
  ...rest
}: Props) => {
  return (
    <Dialog {...rest}>
      <div className="p-2 text-center space-y-4">
        <Heading as="h1Small">このチームを脱退しますか</Heading>
        <div>
          <Button onClick={onClick}>脱退する</Button>
        </div>
      </div>
    </Dialog>
  );
};
