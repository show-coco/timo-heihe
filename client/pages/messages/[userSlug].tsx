import { useRouter } from "next/router";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MessageItem } from "../../components/message/message";
import { MessagesTemplate } from "../../components/template/messages";
import { UserInfo } from "../../components/user-info/user-info";
import { useMessagesQuery, useOpponentUserQuery } from "../../generated/types";
import { useMessageUsers } from "../../hooks/useMessageUsers";

const currentDate = new Date();

export default function Message() {
  const router = useRouter();
  const slug = router.query.userSlug;
  const { users } = useMessageUsers();

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

  if (error) console.error(error);
  console.log(messageData);

  return (
    <MessagesTemplate users={users}>
      <div className="divide-y">
        {loading ? (
          <div className="h-16">Loading...</div>
        ) : opponentData ? (
          <UserInfo {...opponentData.user} className="h-16 ml-5" />
        ) : (
          <div>情報が取得できませんでした</div>
        )}

        {messageData ? (
          <div
            id="scrollableDiv"
            className="flex flex-col-reverse px-5 overflow-auto h-96"
          >
            <InfiniteScroll
              hasMore={true}
              inverse={true}
              scrollableTarget="scrollableDiv"
              next={async () => {
                console.log(
                  "vea",
                  messageData.messages[messageData.messages.length - 1]
                    .createdAt
                );
                await fetchMore({
                  variables: {
                    input: {
                      opponentSlug: slug?.toString() || "",
                      cursor:
                        messageData.messages[messageData.messages.length - 1]
                          .createdAt,
                    },
                  },
                });
              }}
              loader={<div>Loading...</div>}
              dataLength={messageData?.messages.length || 0}
              style={{
                padding: "0 10px",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              {messageData?.messages.map((message, i) => (
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
    </MessagesTemplate>
  );
}
