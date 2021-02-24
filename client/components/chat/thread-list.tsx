import React, { useEffect } from "react";
import {
  ChatItemFragment,
  ThreadListQuery,
  useThreadListQuery,
  useThreadSubscription,
} from "../../generated/types";
import { ChatItem } from "./chat-item/chat-item";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuthContext } from "../../providers/useAuthContext";

type Props = {
  channelId: number;
  threads: ChatItemFragment[];
  setThreads: React.Dispatch<React.SetStateAction<ChatItemFragment[]>>;
};

const currentDate = new Date().toISOString();

export const ThreadList: React.FC<Props> = ({
  channelId,
  threads,
  setThreads,
}: Props) => {
  const { id } = useAuthContext();

  const { data, loading, error, fetchMore } = useThreadListQuery({
    variables: {
      input: {
        channelId,
        cursor: currentDate,
      },
    },
  });

  const { data: newThread } = useThreadSubscription({
    variables: {
      channelId,
    },
  });

  useEffect(() => {
    if (newThread) {
      console.log("new threadssss", newThread);

      // threadサブスクリプション返却型からChatItemFragmentへ変換
      const addedThread = newThread.threadAdded;
      const thread: ChatItemFragment = {
        id: addedThread.id,
        createdAt: addedThread.createdAt,
        channel: addedThread.channel,
        text: addedThread.text,
        user: addedThread.user,
        numberOfMessages: addedThread.numberOfMessages,
      };

      setThreads([thread, ...threads]);
    }
  }, [newThread, setThreads]);

  useEffect(() => {
    if (data?.threads) {
      setThreads(data?.threads);
      console.log("first threads", data.threads);
    }
  }, [data?.threads, setThreads]);

  if (channelId === 0)
    return (
      <div className="flex-1">
        <p>ルームが選択されていません</p>
      </div>
    );
  if (loading)
    return (
      <div className="flex-1">
        <p>読み込み中</p>
      </div>
    );
  if (error || !data)
    return (
      <div className="flex-1">
        <p>メッセージの読み込みに失敗しました</p>
      </div>
    );

  return (
    <div id="scrollDiv" className="h-70vh overflow-auto flex flex-col-reverse">
      <InfiniteScroll
        hasMore={true}
        loader={<p>ロード中です</p>}
        scrollableTarget="scrollDiv"
        dataLength={threads.length}
        style={{ display: "flex", flexDirection: "column-reverse" }}
        inverse={true}
        next={async () => {
          const { data }: { data: ThreadListQuery } = await fetchMore({
            variables: {
              input: {
                channelId,
                cursor: threads[threads.length - 1].createdAt,
              },
            },
          });
          if (data.threads) {
            setThreads([...threads, ...data.threads]);
          }
        }}
      >
        {threads.length === 0 ? (
          <p>スレッドを送信してみましょう！</p>
        ) : (
          threads.map((thread, i) => (
            <ChatItem item={thread} key={i} isMe={thread.user.id === id} />
          ))
        )}
      </InfiniteScroll>
    </div>
  );
};
