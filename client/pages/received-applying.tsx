import React from "react";
import { Heading } from "../components/heading/heading";
import { ReceivedApplyingCard } from "../components/received-applying-card";
import { Template } from "../components/template/app/template";

export default function ReceivedApplyingPage() {
  return (
    <Template className="p-10">
      <div className="w-3/5 mx-auto">
        <Heading as="h1Big" className="mb-8">
          受け取った申請
        </Heading>

        <Heading as="h2" className="mb-5">
          Timo Heihe
        </Heading>

        <ReceivedApplyingCard />
      </div>
    </Template>
  );
}
