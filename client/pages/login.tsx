import React from "react";
import { LoginHeader } from "../components/header";
import { Heading } from "../components/heading/heading";
import { Circle } from "../components/circle";
function Login() {
  return (
    <div className="bg-gradient-to-t from-yellow-100 h-screen w-screen relative  overflow-hidden block">
      <Circle
        parentWith="w-10/12"
        className="absolute -top-24 -right-1/4 w-1/2 h-5/6 bg-gradient-to-t from-yellow-400 z-1"
      />
      <LoginHeader />
      <div className="w-2/5 ml-16">
        <Heading className="ml-4 py-10 font-bold " as="h1Big">
          アウトプットを価値化しよう
        </Heading>
        <Heading className="ml-4" as="h1Small">
          このサービスで、執筆した記事や開発でアウトプットしたモノを<br></br>
          可視化・価値化することができます。
        </Heading>
      </div>
      <a href="http://localhost:8080/google">
        <button className="shadow-md py-1 px-3 align-middle ml-20 my-12 bg-gradient-to-r from-orange-400 to-orange-350 rounded-md text-white">
          <span className="text-white align-middle pr-1 font-bold text-2xl">
            G
          </span>
          Googleでログイン
        </button>
      </a>
      <Circle
        parentWith="w-7/12"
        className="w-16 h-16 bg-gradient-to-t from-purple-100 to-pink-100
        my-14 
        "
      />
      <Circle className="w-20 h-20 bg-gradient-to-t from-blue-350 mr-96 to-blue-150" />
    </div>
  );
}

export default Login;
