import {
  MessageTimelineFragment,
  useMessageTimelinesQuery,
} from "../generated/types";

export type UseMessageUsers = {
  users: (MessageTimelineFragment | undefined)[];
};

export const useMessageUsers = (): UseMessageUsers => {
  const { data, error } = useMessageTimelinesQuery();

  if (error) console.error(error);

  if (!data)
    return {
      users: [],
    };

  console.log(data);

  const users = data.myRooms
    .flatMap((room) => room.applyingUsers)
    .flatMap((applyingUsers) => applyingUsers?.user);

  const filteredUsers = users.filter((item, index, array) => {
    return array.findIndex((item2) => item?.id === item2?.id) === index;
  });

  return {
    users: filteredUsers,
  };
};
