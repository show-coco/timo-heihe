import { useRouter } from "next/router";
import React from "react";
import { Card } from "../../components/card/card";
import { Template } from "../../components/template/template";

export default function UserDetail() {
  const router = useRouter();
  const id = router.query.id;

  console.log(id);

  return (
    <Template>
      <div className="flex">
        <Card className="p-8">Hello</Card>
      </div>
    </Template>
  );
}
