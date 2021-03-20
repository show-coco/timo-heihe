import React from "react";
import { Avatar } from "../avatar/avatar";
import { Button } from "../button";
import { Card } from "../card";
import { Heading } from "../heading/heading";

export const ReceivedApplyingCard: React.FC = () => {
  return (
    <Card className="flex items-center justify-between px-5">
      <div className="flex items-center">
        <Avatar src="http://flat-icon-design.com/f/f_object_174/s256_f_object_174_0bg.png" />

        <div className="flex flex-col ml-3">
          <Heading as="h3">Ropital</Heading>
          <div>@ropital</div>
        </div>
      </div>

      <div className="space-x-5">
        <Button variant="outline" colorScheme="red">
          拒否
        </Button>
        <Button variant="outline" colorScheme="blue">
          メッセージを送る
        </Button>
      </div>
    </Card>
  );
};
