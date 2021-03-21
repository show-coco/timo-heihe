import React from "react";
import { Heading } from "../components/heading/heading";
import { ReceivedApplyingCard } from "../components/received-applying-card";
import { Template } from "../components/template/app/template";
import { useReceivedApplyingQuery } from "../generated/types";

export default function ReceivedApplyingPage() {
  const { data, loading } = useReceivedApplyingQuery();

  return (
    <Template className="p-10">
      <div className="w-3/5 mx-auto">
        <Heading as="h1Big" className="mb-8">
          受け取った申請
        </Heading>

        {data?.myRooms.map((myRoom) =>
          myRoom.applyingUsers ? (
            <div className="mb-8">
              <Heading as="h2" className="mb-5">
                {myRoom.name}
              </Heading>

              {myRoom.applyingUsers.map((applyingUser) => (
                <ReceivedApplyingCard {...applyingUser} key={applyingUser.id} />
              ))}
            </div>
          ) : null
        )}
      </div>
    </Template>
  );
}
