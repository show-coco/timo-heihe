import { useRouter } from "next/router";
import React from "react";
import { Card } from "../../components/card/card";
import { Template } from "../../components/template/template";

export default function ShowTeam() {
  const router = useRouter();
  const id = router.query.id;

  console.log(id);

  return (
    <Template>
      <Card>a</Card>
    </Template>
  );
}
