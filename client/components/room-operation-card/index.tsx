import Link from "next/link";
import React from "react";
import { RoomOperationCardFragment } from "../../generated/types";
import { Avatar } from "../avatar/avatar";
import { Button } from "../button";
import { Heading } from "../heading/heading";

type Props = RoomOperationCardFragment;

export const RoomOperationCard: React.FC<Props> = (props: Props) => {
  return (
    <div className="flex items-center w-full px-5 py-3 bg-white rounded-md">
      <Avatar src={props.icon || ""} name={props.name} />

      <div className="flex-1 px-3">
        <Heading as="h3">{props.name}</Heading>
        <div>@{props.slug}</div>
      </div>

      <div className="flex flex-row items-center space-x-3">
        <Link href="/dashboard/:slug" as={`/dashboard/${props.slug}`}>
          <Button variant="outline" colorScheme="blue">
            詳細
          </Button>
        </Link>

        <Link href="/room/:slug" as={`/room/${props.slug}`}>
          <Button variant="outline" colorScheme="orange">
            募集ページ
          </Button>
        </Link>
      </div>
    </div>
  );
};
