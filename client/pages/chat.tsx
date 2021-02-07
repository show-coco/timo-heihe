import React from "react";
import { Heading } from "../components/heading/heading";
import { Template } from "../components/template/template";
import { TextInput } from "../components/text-input/text-input";
import { useAuthContext } from "../providers/useAuthContext";

export default function ChatPage() {
  const { id } = useAuthContext();

  console.log(id);

  return (
    <Template>
      <div className="grid grid-cols-chat h-full border-gray-200 border bg-white">
        <div className="flex items-center flex-col border-gray-200 border-r space-y-5 py-5">
          <div className="bg-orange-500 w-12 h-12 rounded-md" />
          <div className="bg-orange-500 w-12 h-12 rounded-md" />
        </div>

        <div className="flex flex-col border-gray-200 border-r">
          <div className="flex items-center justify-center h-16 border-gray-200 border-b">
            <Heading as="h1Small">Hirosaa</Heading>
          </div>
          <div className="flex-1"></div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center border-gray-200 border-b h-16">
            <Heading as="h3" className="ml-5">
              #general
            </Heading>
          </div>

          <div className="flex-1"></div>

          <div className="h-16 items-center">
            <div className="px-10">
              <TextInput className="w-full p-3" />
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}
