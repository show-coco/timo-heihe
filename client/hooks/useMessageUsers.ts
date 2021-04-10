import {
  MessageTimelineFragment,
  useMessageTimelinesQuery,
} from "../generated/types";
import { useAuthContext } from "../providers/useAuthContext";

export type UseMessageUsers = {
  users: (MessageTimelineFragment | undefined)[];
};

export const useMessageUsers = (): UseMessageUsers => {
  const { id } = useAuthContext();
  const { data, error } = useMessageTimelinesQuery();

  if (error) console.error(error);

  if (!data)
    return {
      users: [],
    };

  console.log(data);

  // TODO
  const appliers = data.opponents
    .flatMap((room) => room.applyingUsers)
    .flatMap((applyingUsers) => applyingUsers?.user);

  const owners = data.opponents.map((room) => room.owner);

  const users = [...appliers, ...owners];

  const opponents = users.filter((user) => user?.id !== id);

  const filteredUsers = opponents.filter((item, index, array) => {
    return array.findIndex((item2) => item?.id === item2?.id) === index;
  });

  console.log("users", filteredUsers);

  return {
    users: filteredUsers,
  };
};
