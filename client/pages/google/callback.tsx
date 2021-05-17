import React from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../../providers/useAuthContext";

function Google() {
  const router = useRouter();
  const { login } = useAuthContext();

  const token = router.query.access_token;
  const name = router.query.name;
  const id = router.query.id;
  const userId = router.query.userId;
  console.log(token, name, id, userId);

  if (!token || !name || !id || !userId) {
    return null;
  }

  if (
    typeof token !== "string" ||
    typeof name !== "string" ||
    typeof userId !== "string" ||
    typeof id !== "string"
  ) {
    return <p>ログインに失敗しました</p>;
  }

  login(token, { name, id: Number(id), userId });

  return <p>ログイン中</p>;
}

export default Google;
