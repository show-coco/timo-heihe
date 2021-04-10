import React from "react";
import { Heading } from "../components/heading/heading";
import { Circle } from "../components/circle";
import { LoginButton } from "../components/login-button";
import { Button } from "../components/button";
import Link from "next/link";
import { Meta } from "../components/head";
function Login() {
  return (
    <div className="relative block w-screen h-screen overflow-hidden bg-gradient-to-t from-yellow-100">
      <Meta title={"ログイン | CloudCircle"} />
      <Circle className="absolute w-96 h-96 -top-12 -right-20 bg-gradient-to-t from-yellow-400" />

      <div className="py-8">
        <header className="relative z-10 w-4/5 p-5 m-auto font-bold bg-white shadow-xl rounded-xl">
          <Heading as="h1Small" className="text-orange-400">
            Cloud Circle
          </Heading>
        </header>
      </div>

      <div className="relative z-10 w-4/5 m-auto md:w-2/5">
        <Heading
          className="flex justify-center py-10 ml-4 text-4xl font-bold"
          as="h2"
        >
          エンジニア同士の繋がりを作ろう
        </Heading>
        <p className="ml-4">
          Cloud
          Circleはエンジニアのためのコミュニティプラットフォームです。みんなと繋がり、開発・研究して仲間と経験をつくろう！
        </p>
      </div>

      <div className="flex flex-col justify-center px-5 py-12 space-y-5 md:space-y-0 md:flex-row md:space-x-5">
        <LoginButton className="shadow-md" />
        <Link href="/">
          <Button className="shadow-md" colorScheme="blue">
            ルーム一覧を見てみる
          </Button>
        </Link>
      </div>
      <Circle className="w-16 h-16 bg-gradient-to-t from-purple-100 to-pink-100 my-14 " />
      <Circle className="w-20 h-20 bg-gradient-to-t from-blue-350 mr-96 to-blue-150" />
    </div>
  );
}

export default Login;
