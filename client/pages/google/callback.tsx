import React from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../../providers/useAuthContext";

function Google() {
  const router = useRouter();
  const { login } = useAuthContext();

  const token = router.query.access_token;
  const name = router.query.name;
  const id = router.query.id;
  if (
    typeof token !== "string" ||
    typeof name !== "string" ||
    typeof id !== "string"
  ) {
    return <p>ログインに失敗しました</p>;
  }

  login(token, { name, id });

  return <p>ログイン中</p>;
}

export default Google;
