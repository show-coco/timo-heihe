import React from "react";
import { ReceivedApplyingCardFragment } from "../../generated/types";
import { Avatar } from "../avatar/avatar";
import { Button } from "../button";
import { Card } from "../card";
import { Heading } from "../heading/heading";

type Props = ReceivedApplyingCardFragment & {
  onReject: () => void;
  onAccept: () => void;
};

export const ReceivedAppsCard: React.FC<Props> = (props: Props) => {
  return (
    <Card className="flex items-center justify-between px-5">
      <div className="flex items-center">
        <Avatar src={props.avatar || ""} />

        <div className="flex flex-col ml-3">
          <Heading as="h3">{props.name}</Heading>
          <div>@{props.userId}</div>
        </div>
      </div>

      <div className="space-x-5">
        <Button variant="outline" colorScheme="red" onClick={props.onReject}>
          拒否
        </Button>
        <Button variant="outline" colorScheme="blue" onClick={props.onAccept}>
          メッセージを送る
        </Button>
      </div>
    </Card>
  );
};
