import React from "react";
import { LoginHeader } from "../components/header";
import { Heading } from "../components/heading/heading";
import { Circle } from "../components/circle";
import { LoginButton } from "../components/login-button";

function Login() {
  return (
    <div className="relative block w-screen h-screen overflow-hidden bg-gradient-to-t from-yellow-100">
      <Circle
        parentWith="w-10/12"
        className="absolute w-1/2 -top-24 -right-1/4 h-5/6 bg-gradient-to-t from-yellow-400 z-1"
      />
      <LoginHeader />
      <div className="w-2/5 ml-16">
        <Heading className="py-10 ml-4 text-4xl font-bold" as="h2">
          エンジニア同士の繋がりを作ろう
        </Heading>
        <p className="ml-4">
          Cloud
          Circleはエンジニアのためのコミュニティプラットフォームです。みんなと繋がり、開発・研究して仲間と経験をつくろう！
        </p>
      </div>
      <div className="my-12 ml-20">
        <LoginButton className="shadow-md" />
      </div>
      <Circle
        parentWith="w-7/12"
        className="w-16 h-16 bg-gradient-to-t from-purple-100 to-pink-100 my-14 "
      />
      <Circle className="w-20 h-20 bg-gradient-to-t from-blue-350 mr-96 to-blue-150" />
    </div>
  );
}

export default Login;
