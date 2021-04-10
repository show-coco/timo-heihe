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
import { useAuthContext } from "../../providers/useAuthContext";
import { Meta } from "../../components/meta";
const currentDate = new Date();

export default function Message() {
  const router = useRouter();
  const slug = router.query.userSlug;
  const { users } = useMessageUsers();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<MessageFragment[]>([]);
  const { userId } = useAuthContext();
  const [hasNext, setHasNext] = useState(false);

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
  const { data: addedMessage, error: addedError } = useMessageAddedSubscription(
    {
      variables: {
        slug: userId,
      },
    }
  );
  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (messageData) {
      setHasNext(true);
      setMessages([...messageData.messages]);
    }
    if (addedMessage) {
      setMessages([addedMessage.messageAdded, ...messages]);
    }
  }, [addedMessage, messageData]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendMessage({
      variables: {
        text: text,
        opponentSlug: slug?.toString() || "",
      },
      update: (_, { data }) => {
        if (data?.createMessage) {
          setMessages([data.createMessage, ...messages]);
        }
      },
    });
    setText("");
  };

  const onNext = async () => {
    const { data } = await fetchMore({
      variables: {
        input: {
          opponentSlug: slug?.toString() || "",
          cursor: messages[messages.length - 1].createdAt,
        },
      },
    });

    setHasNext(Boolean(data.messages.length));
    setMessages([...messages, ...data.messages]);
  };

  if (error) console.error(error);

  return (
    <MessagesTemplate users={users}>
      <Meta title={"メッセージ | CloudCircle"} />
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
                hasMore={hasNext}
                inverse={true}
                scrollableTarget="scrollableDiv"
                next={onNext}
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
          <form onSubmit={onSubmit}>
            <div className="relative">
              <TextInput
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              <span className="absolute top-0 right-2">
                <IconButton
                  isIcon
                  icon={<SendIcon />}
                  variant="ghost"
                  type="submit"
                />
              </span>
            </div>
          </form>
        </div>
      </div>
    </MessagesTemplate>
  );
}
