import React, { useEffect, useState } from "react";
import { RoomList } from "../components/chat/room-list";
import { SpaceList } from "../components/chat/space-list";
import { ThreadList } from "../components/chat/thread-list";
import { Heading } from "../components/heading/heading";
import { Template } from "../components/template/template";
import { TextInput } from "../components/text-input/text-input";
import { useChatPageQuery } from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";

export default function ChatPage() {
  const { userId } = useAuthContext();
  const { data } = useChatPageQuery({
    variables: {
      userId,
    },
  });
  const [selectedSpace, setSelectedSpace] = useState(0);

  useEffect(() => {
    if (data?.user.teams && data?.user.teams[0].id) {
      setSelectedSpace(data?.user.teams[0].id);
    } else {
      console.error("チーム情報が正常に取得できませんでした");
    }
  }, [data?.user.teams]);

  console.log("chat page", data);

  return (
    <Template>
      <div className="grid grid-cols-chat h-full border-gray-200 border bg-white">
        <SpaceList
          teams={data?.user.teams || []}
          setSelectedSpace={setSelectedSpace}
        />

        {/* チャンネル一覧 */}
        <div className="flex flex-col border-gray-200 border-r">
          <div className="flex items-center justify-center h-16 border-gray-200 border-b">
            <Heading as="h1Small">Hirosaa</Heading>
          </div>
          {selectedSpace !== 0 ? (
            <RoomList
              rooms={
                data?.user.teams?.filter((team) => team.id === selectedSpace)[0]
                  .rooms
              }
            />
          ) : null}
        </div>

        {/* チャット */}
        <div className="flex flex-col">
          <div className="flex items-center border-gray-200 border-b h-16">
            <Heading as="h3" className="ml-5">
              #general
            </Heading>
          </div>

          <ThreadList />

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
