import React from "react";
import { ChatItemFragment } from "../../../generated/types";
import { useChatItem } from "../../../hooks/useChatItem";
import { ChatOperations } from "../chat-operations/chat-operations";
import { ChatItemDisplayer } from "./displayer/displayer";
import { ChatItemEditer } from "./editer/editer";

type Props = {
  item: ChatItemFragment;
  isMe: boolean;
};

export const ChatItem: React.FC<Props> = ({ item, isMe }: Props) => {
  const {
    onClickEdit,
    onClickCancel,
    onEdit,
    onChangeText,
    text,
  } = useChatItem(item.text);

  return (
    <div className="chat-item flex hover:bg-black-100 hover:bg-opacity-10 p-2 relative">
      {isMe && (
        <ChatOperations
          className="absolute top-0 right-2"
          onClickEdit={onClickEdit}
        />
      )}

      {onEdit ? (
        <ChatItemEditer
          onClickCancel={onClickCancel}
          text={text}
          onChangeText={onChangeText}
        />
      ) : (
        <ChatItemDisplayer item={item} />
      )}
    </div>
  );
};
