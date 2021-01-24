import { useRouter } from "next/router";
import React from "react";
import { Card } from "../../components/card/card";
import { Template } from "../../components/template/template";

export default function UserDetail() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <Template>
      <div className="grid grid-rows-2 md:grid-cols-2 gap-10">
        <Card className="p-8">Hello {id}</Card>

        <Card className="p-8">Learning Skills</Card>
      </div>
    </Template>
  );
}
