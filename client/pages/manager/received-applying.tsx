import React from "react";
import { Heading } from "../../components/heading/heading";
import { Sidebar } from "../../components/template/sidebar";
import { Template } from "../../components/template/template";

export default function ReveivedApplying() {
  return (
    <Template>
      <Sidebar />
      <Heading as="h1Small">受け取った申請</Heading>
    </Template>
  );
}
