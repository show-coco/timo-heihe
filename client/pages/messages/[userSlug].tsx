import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MessageItem } from "../../components/message/message";
import { MessagesTemplate } from "../../components/template/messages";
import { TextInput } from "../../components/text-input/text-input";
import { UserInfo } from "../../components/user-info/user-info";
import {
  MessageFragment,
  useMessageAddedSubscription,
  useMessagesQuery,
  useOpponentUserQuery,
  useSendMessageMutation,
} from "../../generated/types";
import { useMessageUsers } from "../../hooks/useMessageUsers";
import SendIcon from "../../assets/icons/send.svg";
import { IconButton } from "../../components/button/icon-button";

const currentDate = new Date();

export default function Message() {
  const router = useRouter();
  const slug = router.query.userSlug;
  const { users } = useMessageUsers();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<MessageFragment[]>([]);

  const { data: messageData, error, fetchMore } = useMessagesQuery({
    variables: {
      input: {
        opponentSlug: slug?.toString() || "",
        cursor: currentDate,
      },
    },
  });
  const { data: opponentData, loading } = useOpponentUserQuery({
    variables: {
      slug: slug?.toString() || "",
    },
  });
  const { data: addedMessage } = useMessageAddedSubscription({
    variables: {
      slug: slug?.toString() || "",
    },
  });
  const [sendMessage] = useSendMessageMutation();

  console.log("messagesData", messages);

  useEffect(() => {
    if (messageData) {
      setMessages([...messageData.messages]);
    }
    if (addedMessage) {
      console.log("messageAdded", addedMessage);
      setMessages([...messages, addedMessage.messageAdded]);
    }
  }, [addedMessage, messageData]);

  if (error) console.error(error);

  return (
    <MessagesTemplate users={users}>
      <div>
        <div className="divide-y">
          {loading ? (
            <div className="h-16">Loading...</div>
          ) : opponentData ? (
            <UserInfo {...opponentData.user} className="h-16 ml-5" />
          ) : (
            <div>情報が取得できませんでした</div>
          )}

          {messages ? (
            <div
              id="scrollableDiv"
              className="flex flex-col-reverse px-5 overflow-auto h-96"
            >
              <InfiniteScroll
                hasMore={true}
                inverse={true}
                scrollableTarget="scrollableDiv"
                next={async () => {
                  const { data } = await fetchMore({
                    variables: {
                      input: {
                        opponentSlug: slug?.toString() || "",
                        cursor: messages[messages.length - 1].createdAt,
                      },
                    },
                  });

                  console.log("veaneani", data.messages);

                  setMessages([...messages, ...data.messages]);
                }}
                loader={<div>Loading...</div>}
                dataLength={messages.length || 0}
                style={{
                  padding: "0 10px",
                  display: "flex",
                  flexDirection: "column-reverse",
                }}
              >
                {messages.map((message, i) => (
                  <MessageItem
                    {...message}
                    key={i}
                    opponentSlug={slug?.toString()}
                  />
                ))}
              </InfiniteScroll>
            </div>
          ) : (
            <div>メッセージがありません。何か送信してみましょう</div>
          )}
        </div>

        <div className="px-3 pt-5">
          <div className="relative">
            <TextInput onChange={(e) => setText(e.target.value)} />
            <span className="absolute top-0 right-2">
              <IconButton
                isIcon
                icon={<SendIcon />}
                variant="ghost"
                onClick={() =>
                  sendMessage({
                    variables: {
                      text: text,
                      opponentSlug: slug?.toString() || "",
                    },
                    update: (_, { data }) => {
                      if (data?.createMessage) {
                        setMessages([data.createMessage, ...messages]);
                      }
                    },
                  })
                }
              />
            </span>
          </div>
        </div>
      </div>
    </MessagesTemplate>
  );
}
