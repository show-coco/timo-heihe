import React from "react";
import { Heading } from "../heading/heading";

export const LoginHeader = () => {
  return (
    <div className="py-8">
      <header className="relative z-10 w-4/5 p-5 m-auto font-bold bg-white shadow-xl text-black-400 rounded-xl">
        <Heading as="h1Small">Cloud Circle</Heading>
      </header>
    </div>
  );
};
