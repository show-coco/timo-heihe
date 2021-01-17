import React from "react";
import { useRouter } from "next/router";
import { jwtManager } from "../../utils/jwtManager";

function Google() {
  const router = useRouter();
  const token = router.query.access_token;
  if (typeof token !== "string") {
    return <p>ログインに失敗しました</p>;
  }
  jwtManager.setJwt(token);
  router.push("/");

  return <p>ログイン中</p>;
}

export default Google;
