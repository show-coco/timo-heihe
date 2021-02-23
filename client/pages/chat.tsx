import React from "react";
import { ChannelList } from "../components/chat/room-list";
import { SpaceList } from "../components/chat/space-list";
import { ThreadList } from "../components/chat/thread-list";
import { Heading } from "../components/heading/heading";
import { Template } from "../components/template/template";
import { TextInput } from "../components/text-input/text-input";
import { useChat } from "../hooks/useChat";
import { ReactComponent as SendIcon } from "../assets/icons/send.svg";
// MEMO&TODO: svgのなぜか色が変えられなかったため、別のsvgファイルを使用してる
import { ReactComponent as InActiveSendIcon } from "../assets/icons/send-inactive.svg";
import { CreateChannelModal } from "../components/chat/modals/create-channel";
import { CreateRoomModal } from "../components/chat/modals/create-room";
import { MoveToRecruitModal } from "../components/chat/modals/move-to-recruit";

export default function ChatPage() {
  const {
    status,
    setter,
    data,
    selectedRoom,
    selectedSpace,
    onClickSendButton,
    onCreateRoom,
    createRoomModal,
    createSpace,
  } = useChat();

  return (
    <>
      <CreateChannelModal
        {...createRoomModal}
        channelName={status.channelName}
        onCreate={onCreateRoom}
        onChangeName={setter.onChangeRoomName}
      />
      <CreateRoomModal {...createSpace} />
      <MoveToRecruitModal
        {...createSpace.moveToRecruitModal}
        onMoveToRecruit={createSpace.moveToRecruit}
      />

      <Template>
        <div className="grid grid-cols-chat h-full border-gray-200 border bg-white">
          <SpaceList
            rooms={status.rooms}
            setSelectedRoom={setter.setSelectedRoomId}
            onOpen={createSpace.modal.onOpen}
          />

          {/* チャンネル一覧 */}
          <div className="flex flex-col border-gray-200 border-r">
            <div className="flex items-center justify-center h-16 border-gray-200 border-b">
              <Heading as="h1Small">
                {selectedSpace ? selectedSpace.title : ""}
              </Heading>
            </div>

            <div className="py-1 px-3 flex justify-between">
              <span>チャンネル</span>
              <button
                className="hover:bg-black-400 hover:bg-opacity-20 h-6 w-6 flex items-center justify-center rounded-sm"
                onClick={createRoomModal.onOpen}
              >
                +
              </button>
            </div>

            {status.selectedChannelId !== 0 ? (
              <ChannelList
                channels={status.channels}
                setSelectedChannelId={setter.setSelectedChannelId}
              />
            ) : null}
          </div>

          {/* チャット */}
          <div className="flex flex-col">
            <div className="flex items-center border-gray-200 border-b h-16">
              <Heading as="h3" className="ml-5">
                {selectedRoom ? `#${selectedRoom.name}` : ""}
              </Heading>
            </div>

            <ThreadList
              roomId={status.selectedRoomId}
              threads={status.threads}
              setThreads={setter.setThreads}
            />

            {/* 送信フォーム */}
            <form className="h-16 items-center" onSubmit={onClickSendButton}>
              <div className="px-10">
                <div className="relative">
                  <TextInput
                    className="w-full p-3"
                    onChange={setter.onChangeText}
                    value={status.text}
                  />
                  <button
                    className="absolute top-0.6 right-2"
                    type="submit"
                    disabled={status.text.length === 0}
                  >
                    {status.text ? <SendIcon /> : <InActiveSendIcon />}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Template>
    </>
  );
}
