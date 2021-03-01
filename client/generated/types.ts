import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CategoryInput = {
  id: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
};

export type CategoryModel = {
  __typename?: "CategoryModel";
  id?: Maybe<Scalars["Int"]>;
  name: Scalars["String"];
  rooms: Array<RoomModel>;
};

export type ChannelModel = {
  __typename?: "ChannelModel";
  id: Scalars["Int"];
  name: Scalars["String"];
  room: RoomModel;
  team: RoomModel;
  threads: Array<ThreadModel>;
  user: UserModel;
};

export type ChannelResponse = {
  __typename?: "ChannelResponse";
  affected?: Maybe<Scalars["Int"]>;
};

export type ConnectChannelInput = {
  id: Scalars["Int"];
};

export type ConnectRoomInput = {
  id: Scalars["Int"];
};

export type ConnectThreadInput = {
  id: Scalars["Int"];
};

export type ConnectUserInput = {
  avatar?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  githubId?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  introduction?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  skills?: Maybe<Array<SkillInput>>;
  twitterId?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["String"]>;
};

export type CreateCategoryInput = {
  name: Scalars["String"];
};

export type CreateChannelInput = {
  name: Scalars["String"];
  room: ConnectRoomInput;
};

export type CreateMessageInput = {
  text: Scalars["String"];
  thread: ConnectThreadInput;
  user: ConnectUserInput;
};

export type CreateRoomInput = {
  categories: Array<CategoryInput>;
  description?: Maybe<Scalars["String"]>;
  icon?: Maybe<Scalars["String"]>;
  isRequired: Scalars["Boolean"];
  members: Array<CreateRoomMembersUserInput>;
  name: Scalars["String"];
  owner: ConnectUserInput;
  recruitNumbers: Scalars["Int"];
  rectuiting?: Maybe<Scalars["Boolean"]>;
  repositoryUrl?: Maybe<Scalars["String"]>;
  skills: Array<SkillInput>;
  slug: Scalars["String"];
  title: Scalars["String"];
  typeIds: Array<Scalars["Int"]>;
};

export type CreateRoomMembersUserInput = {
  room?: Maybe<UpdateRoomInput>;
  user: ConnectUserInput;
};

export type CreateSkillInput = {
  icon: Scalars["String"];
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type CreateThreadInput = {
  channel: ConnectChannelInput;
  text: Scalars["String"];
  user: ConnectUserInput;
};

export type FetchThreadInput = {
  channelId: Scalars["Int"];
  cursor: Scalars["String"];
};

export enum MemberState {
  Ejected = "EJECTED",
  Joining = "JOINING",
  Leave = "LEAVE",
  Pending = "PENDING",
}

export type MessageModel = {
  __typename?: "MessageModel";
  createdAt: Scalars["DateTime"];
  id: Scalars["Int"];
  text: Scalars["String"];
  thread: ThreadModel;
  user: UserModel;
};

export type Mutation = {
  __typename?: "Mutation";
  applyRoom: RoomModel;
  createCategory: CategoryModel;
  createChannel: ChannelModel;
  createMessage: MessageModel;
  createRoom: RoomModel;
  createSkill: SkillModel;
  createThread: ThreadModel;
  deleteChannel: ChannelResponse;
  deleteRoom: RoomModel;
  joinRoom: RoomModel;
  leaveRoom: RoomModel;
  removeCategory: CategoryModel;
  removeMessage: ChannelResponse;
  removeSkill: SkillModel;
  removeThread: ThreadModel;
  updateCategory: CategoryModel;
  updateMessage: MessageModel;
  updateRoom: RoomModel;
  updateSkill: SkillModel;
  updateThread: ThreadModel;
  updateUser: UserModel;
};

export type MutationApplyRoomArgs = {
  roomId: Scalars["Int"];
  userId: Scalars["Int"];
};

export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};

export type MutationCreateChannelArgs = {
  input: CreateChannelInput;
};

export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};

export type MutationCreateRoomArgs = {
  input: CreateRoomInput;
};

export type MutationCreateSkillArgs = {
  createSkillInput: CreateSkillInput;
};

export type MutationCreateThreadArgs = {
  input: CreateThreadInput;
};

export type MutationDeleteChannelArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteRoomArgs = {
  id: Scalars["Int"];
};

export type MutationJoinRoomArgs = {
  roomId: Scalars["Int"];
  userId: Scalars["Int"];
};

export type MutationLeaveRoomArgs = {
  roomId: Scalars["Int"];
  userId: Scalars["Int"];
};

export type MutationRemoveCategoryArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveMessageArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveSkillArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveThreadArgs = {
  id: Scalars["Int"];
};

export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};

export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput;
};

export type MutationUpdateRoomArgs = {
  updateRoomInput: UpdateRoomInput;
};

export type MutationUpdateSkillArgs = {
  updateSkillInput: UpdateSkillInput;
};

export type MutationUpdateThreadArgs = {
  input: UpdateThreadInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: "Query";
  categories: Array<CategoryModel>;
  category: CategoryModel;
  channel: ChannelModel;
  channels: Array<ChannelModel>;
  me: UserModel;
  message: MessageModel;
  messages: Array<MessageModel>;
  room: RoomModel;
  rooms: Array<RoomModel>;
  roomTypes: Array<RoomTypeModel>;
  skill: SkillModel;
  skills: Array<SkillModel>;
  thread: ThreadModel;
  threads?: Maybe<Array<ThreadModel>>;
  user: UserModel;
  users: Array<UserModel>;
};

export type QueryCategoryArgs = {
  id: Scalars["Int"];
};

export type QueryChannelArgs = {
  id: Scalars["Int"];
};

export type QueryMessageArgs = {
  id: Scalars["Int"];
};

export type QueryRoomArgs = {
  slug: Scalars["String"];
};

export type QueryRoomsArgs = {
  input?: Maybe<SearchRoomInput>;
};

export type QuerySkillArgs = {
  id: Scalars["Int"];
};

export type QueryThreadArgs = {
  id: Scalars["Int"];
};

export type QueryThreadsArgs = {
  input: FetchThreadInput;
};

export type QueryUserArgs = {
  userId: Scalars["String"];
};

export type RoomMemberModel = {
  __typename?: "RoomMemberModel";
  avatar?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  githubId?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  introduction?: Maybe<Scalars["String"]>;
  memberState: MemberState;
  name: Scalars["String"];
  ownerTeams: Array<RoomModel>;
  skills: Array<SkillModel>;
  teams: Array<RoomModel>;
  twitterId?: Maybe<Scalars["String"]>;
  userId: Scalars["String"];
};

export type RoomModel = {
  __typename?: "RoomModel";
  categories: Array<CategoryModel>;
  channels?: Maybe<Array<ChannelModel>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  icon?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
  isRequired: Scalars["Boolean"];
  members?: Maybe<Array<RoomMemberModel>>;
  name: Scalars["String"];
  owner: UserModel;
  recruitNumbers: Scalars["Int"];
  repositoryUrl?: Maybe<Scalars["String"]>;
  skills?: Maybe<Array<SkillModel>>;
  slug: Scalars["String"];
  title: Scalars["String"];
  types: Array<RoomTypeModel>;
};

export type RoomTypeModel = {
  __typename?: "RoomTypeModel";
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type SearchRoomInput = {
  categoryIds?: Maybe<Array<Scalars["Int"]>>;
  name?: Maybe<Scalars["String"]>;
  recruitNumbers?: Maybe<Scalars["Int"]>;
  skillIds?: Maybe<Array<Scalars["Int"]>>;
  typeId?: Maybe<Scalars["Int"]>;
};

export type SkillInput = {
  icon?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
};

export type SkillModel = {
  __typename?: "SkillModel";
  icon: Scalars["String"];
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type Subscription = {
  __typename?: "Subscription";
  messageAdded: MessageModel;
  threadAdded: ThreadModel;
};

export type SubscriptionMessageAddedArgs = {
  roomId: Scalars["Int"];
};

export type SubscriptionThreadAddedArgs = {
  channelId: Scalars["Int"];
};

export type ThreadModel = {
  __typename?: "ThreadModel";
  channel: ChannelModel;
  createdAt: Scalars["DateTime"];
  id: Scalars["Int"];
  numberOfMessages: Scalars["Int"];
  text: Scalars["String"];
  user: UserModel;
};

export type UpdateCategoryInput = {
  id: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
};

export type UpdateMessageInput = {
  id: Scalars["Int"];
  text?: Maybe<Scalars["String"]>;
  thread?: Maybe<ConnectThreadInput>;
  user?: Maybe<ConnectUserInput>;
};

export type UpdateRoomInput = {
  categories?: Maybe<Array<CategoryInput>>;
  description?: Maybe<Scalars["String"]>;
  icon?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  isRequired?: Maybe<Scalars["Boolean"]>;
  members?: Maybe<Array<CreateRoomMembersUserInput>>;
  name?: Maybe<Scalars["String"]>;
  owner?: Maybe<ConnectUserInput>;
  recruitNumbers?: Maybe<Scalars["Int"]>;
  rectuiting?: Maybe<Scalars["Boolean"]>;
  repositoryUrl?: Maybe<Scalars["String"]>;
  skills?: Maybe<Array<SkillInput>>;
  slug?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  typeIds?: Maybe<Array<Scalars["Int"]>>;
};

export type UpdateSkillInput = {
  icon?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
};

export type UpdateThreadInput = {
  id: Scalars["Int"];
  text: Scalars["String"];
};

export type UpdateUserInput = {
  avatar?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  githubId?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  introduction?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  skills?: Maybe<Array<SkillInput>>;
  twitterId?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["String"]>;
};

export type UserMemberModel = {
  __typename?: "UserMemberModel";
  categories: Array<CategoryModel>;
  channels?: Maybe<Array<ChannelModel>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  icon?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
  isRequired: Scalars["Boolean"];
  members?: Maybe<Array<RoomMemberModel>>;
  memberState: MemberState;
  name: Scalars["String"];
  owner: UserModel;
  recruitNumbers: Scalars["Int"];
  repositoryUrl?: Maybe<Scalars["String"]>;
  skills?: Maybe<Array<SkillModel>>;
  title: Scalars["String"];
};

export type UserModel = {
  __typename?: "UserModel";
  avatar?: Maybe<Scalars["String"]>;
  channels?: Maybe<Array<ChannelModel>>;
  email: Scalars["String"];
  githubId?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  introduction?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  ownerTeams?: Maybe<Array<RoomModel>>;
  rooms?: Maybe<Array<UserMemberModel>>;
  skills?: Maybe<Array<SkillModel>>;
  twitterId?: Maybe<Scalars["String"]>;
  userId: Scalars["String"];
};

export type ChannelItemFragment = { __typename?: "ChannelModel" } & Pick<
  ChannelModel,
  "id" | "name"
>;

export type ChannelListFragment = { __typename?: "UserMemberModel" } & {
  channels?: Maybe<
    Array<{ __typename?: "ChannelModel" } & ChannelItemFragment>
  >;
};

export type ChatItemFragment = { __typename?: "ThreadModel" } & Pick<
  ThreadModel,
  "id" | "text" | "createdAt" | "numberOfMessages"
> & {
    channel: { __typename?: "ChannelModel" } & Pick<ChannelModel, "id">;
    user: { __typename?: "UserModel" } & Pick<
      UserModel,
      "id" | "name" | "avatar"
    >;
  };

export type RoomCardFragment = { __typename?: "RoomModel" } & Pick<
  RoomModel,
  | "id"
  | "title"
  | "slug"
  | "description"
  | "icon"
  | "recruitNumbers"
  | "isRequired"
  | "repositoryUrl"
  | "createdAt"
> & {
    members?: Maybe<
      Array<
        { __typename?: "RoomMemberModel" } & Pick<
          RoomMemberModel,
          "id" | "userId" | "name" | "avatar" | "memberState"
        >
      >
    >;
    owner: { __typename?: "UserModel" } & Pick<
      UserModel,
      "id" | "userId" | "name" | "avatar"
    >;
    skills?: Maybe<
      Array<{ __typename?: "SkillModel" } & Pick<SkillModel, "id" | "name">>
    >;
    categories: Array<
      { __typename?: "CategoryModel" } & Pick<CategoryModel, "id" | "name">
    >;
  };

export type RoomItemFragment = { __typename?: "UserMemberModel" } & Pick<
  UserMemberModel,
  "id" | "name" | "icon"
>;

export type RoomTypesFragment = { __typename?: "RoomTypeModel" } & Pick<
  RoomTypeModel,
  "id" | "name"
>;

export type SkillItemFragment = { __typename?: "SkillModel" } & Pick<
  SkillModel,
  "id" | "name"
>;

export type CreateChannelMutationVariables = Exact<{
  input: CreateChannelInput;
}>;

export type CreateChannelMutation = { __typename?: "Mutation" } & {
  createChannel: { __typename?: "ChannelModel" } & ChannelItemFragment;
};

export type CreateRoomMutationVariables = Exact<{
  input: CreateRoomInput;
}>;

export type CreateRoomMutation = { __typename?: "Mutation" } & {
  createRoom: { __typename?: "RoomModel" } & Pick<
    RoomModel,
    "id" | "title" | "slug"
  >;
};

export type CreateThreadMutationVariables = Exact<{
  input: CreateThreadInput;
}>;

export type CreateThreadMutation = { __typename?: "Mutation" } & {
  createThread: { __typename?: "ThreadModel" } & ChatItemFragment;
};

export type EditRoomMutationVariables = Exact<{
  input: UpdateRoomInput;
}>;

export type EditRoomMutation = { __typename?: "Mutation" } & {
  updateRoom: { __typename?: "RoomModel" } & Pick<
    RoomModel,
    "id" | "title" | "slug"
  >;
};

export type EditThreadMutationVariables = Exact<{
  input: UpdateThreadInput;
}>;

export type EditThreadMutation = { __typename?: "Mutation" } & {
  updateThread: { __typename?: "ThreadModel" } & Pick<
    ThreadModel,
    "id" | "text"
  >;
};

export type JoinRoomMutationVariables = Exact<{
  roomId: Scalars["Int"];
  userId: Scalars["Int"];
}>;

export type JoinRoomMutation = { __typename?: "Mutation" } & {
  joinRoom: { __typename?: "RoomModel" } & Pick<RoomModel, "id" | "title"> & {
      members?: Maybe<
        Array<
          { __typename?: "RoomMemberModel" } & Pick<
            RoomMemberModel,
            "id" | "name"
          >
        >
      >;
    };
};

export type LeaveRoomMutationVariables = Exact<{
  roomId: Scalars["Int"];
  userId: Scalars["Int"];
}>;

export type LeaveRoomMutation = { __typename?: "Mutation" } & {
  leaveRoom: { __typename?: "RoomModel" } & Pick<RoomModel, "id" | "title"> & {
      members?: Maybe<
        Array<
          { __typename?: "RoomMemberModel" } & Pick<
            RoomMemberModel,
            "id" | "name"
          >
        >
      >;
    };
};

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;

export type UpdateUserMutation = { __typename?: "Mutation" } & {
  updateUser: { __typename?: "UserModel" } & Pick<UserModel, "id" | "userId">;
};

export type ApplyRoomMutationVariables = Exact<{
  roomId: Scalars["Int"];
  userId: Scalars["Int"];
}>;

export type ApplyRoomMutation = { __typename?: "Mutation" } & {
  applyRoom: { __typename?: "RoomModel" } & Pick<RoomModel, "id" | "title">;
};

export type ChatPageQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type ChatPageQuery = { __typename?: "Query" } & {
  user: { __typename?: "UserModel" } & {
    rooms?: Maybe<
      Array<
        { __typename?: "UserMemberModel" } & RoomItemFragment &
          ChannelListFragment
      >
    >;
  };
};

export type CreateRoomPageQueryVariables = Exact<{ [key: string]: never }>;

export type CreateRoomPageQuery = { __typename?: "Query" } & {
  categories: Array<
    { __typename?: "CategoryModel" } & Pick<CategoryModel, "id" | "name">
  >;
  skills: Array<
    { __typename?: "SkillModel" } & Pick<SkillModel, "id" | "name" | "icon">
  >;
  roomTypes: Array<
    { __typename?: "RoomTypeModel" } & Pick<RoomTypeModel, "id" | "name">
  >;
};

export type RoomEditPageQueryVariables = Exact<{
  slug: Scalars["String"];
}>;

export type RoomEditPageQuery = { __typename?: "Query" } & {
  room: { __typename?: "RoomModel" } & Pick<
    RoomModel,
    | "id"
    | "title"
    | "name"
    | "slug"
    | "description"
    | "icon"
    | "recruitNumbers"
    | "isRequired"
    | "repositoryUrl"
  > & {
      members?: Maybe<
        Array<
          { __typename?: "RoomMemberModel" } & Pick<
            RoomMemberModel,
            "id" | "name" | "avatar"
          >
        >
      >;
      owner: { __typename?: "UserModel" } & Pick<
        UserModel,
        "id" | "name" | "avatar"
      >;
      skills?: Maybe<
        Array<{ __typename?: "SkillModel" } & Pick<SkillModel, "id" | "name">>
      >;
      categories: Array<
        { __typename?: "CategoryModel" } & Pick<CategoryModel, "id" | "name">
      >;
      types: Array<
        { __typename?: "RoomTypeModel" } & Pick<RoomTypeModel, "id" | "name">
      >;
    };
  categories: Array<
    { __typename?: "CategoryModel" } & Pick<CategoryModel, "id" | "name">
  >;
  skills: Array<
    { __typename?: "SkillModel" } & Pick<SkillModel, "id" | "name">
  >;
  roomTypes: Array<
    { __typename?: "RoomTypeModel" } & Pick<RoomTypeModel, "id" | "name">
  >;
};

export type EditUserPageQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type EditUserPageQuery = { __typename?: "Query" } & {
  user: { __typename?: "UserModel" } & Pick<
    UserModel,
    | "id"
    | "userId"
    | "name"
    | "avatar"
    | "introduction"
    | "githubId"
    | "twitterId"
  > & {
      skills?: Maybe<
        Array<{ __typename?: "SkillModel" } & Pick<SkillModel, "id" | "name">>
      >;
      rooms?: Maybe<
        Array<
          { __typename?: "UserMemberModel" } & Pick<
            UserMemberModel,
            "id" | "title" | "description" | "createdAt" | "recruitNumbers"
          > & {
              skills?: Maybe<
                Array<
                  { __typename?: "SkillModel" } & Pick<
                    SkillModel,
                    "id" | "name"
                  >
                >
              >;
              owner: { __typename?: "UserModel" } & Pick<
                UserModel,
                "id" | "name" | "avatar" | "userId"
              >;
              members?: Maybe<
                Array<
                  { __typename?: "RoomMemberModel" } & Pick<
                    RoomMemberModel,
                    "id" | "userId"
                  >
                >
              >;
            }
        >
      >;
    };
  skills: Array<
    { __typename?: "SkillModel" } & Pick<SkillModel, "id" | "name">
  >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me: { __typename?: "UserModel" } & Pick<
    UserModel,
    "id" | "userId" | "name" | "avatar"
  > & {
      skills?: Maybe<Array<{ __typename?: "SkillModel" } & SkillItemFragment>>;
    };
};

export type RoomQueryVariables = Exact<{
  slug: Scalars["String"];
}>;

export type RoomQuery = { __typename?: "Query" } & {
  room: { __typename?: "RoomModel" } & Pick<
    RoomModel,
    | "id"
    | "title"
    | "name"
    | "description"
    | "icon"
    | "recruitNumbers"
    | "isRequired"
    | "repositoryUrl"
  > & {
      members?: Maybe<
        Array<
          { __typename?: "RoomMemberModel" } & Pick<
            RoomMemberModel,
            "id" | "userId" | "name" | "avatar" | "memberState"
          >
        >
      >;
      owner: { __typename?: "UserModel" } & Pick<
        UserModel,
        "id" | "userId" | "name" | "avatar"
      >;
      skills?: Maybe<
        Array<{ __typename?: "SkillModel" } & Pick<SkillModel, "id" | "name">>
      >;
      categories: Array<
        { __typename?: "CategoryModel" } & Pick<CategoryModel, "id" | "name">
      >;
    };
};

export type RoomsQueryVariables = Exact<{
  input?: Maybe<SearchRoomInput>;
}>;

export type RoomsQuery = { __typename?: "Query" } & {
  rooms: Array<{ __typename?: "RoomModel" } & RoomCardFragment>;
  roomTypes: Array<{ __typename?: "RoomTypeModel" } & RoomTypesFragment>;
};

export type SearchConditionsQueryVariables = Exact<{ [key: string]: never }>;

export type SearchConditionsQuery = { __typename?: "Query" } & {
  categories: Array<
    { __typename?: "CategoryModel" } & Pick<CategoryModel, "id" | "name">
  >;
  skills: Array<
    { __typename?: "SkillModel" } & Pick<SkillModel, "icon" | "id" | "name">
  >;
};

export type ThreadListQueryVariables = Exact<{
  input: FetchThreadInput;
}>;

export type ThreadListQuery = { __typename?: "Query" } & {
  threads?: Maybe<Array<{ __typename?: "ThreadModel" } & ChatItemFragment>>;
};

export type UserDetailPageQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type UserDetailPageQuery = { __typename?: "Query" } & {
  user: { __typename?: "UserModel" } & Pick<
    UserModel,
    | "id"
    | "userId"
    | "name"
    | "avatar"
    | "introduction"
    | "githubId"
    | "twitterId"
  > & {
      skills?: Maybe<
        Array<{ __typename?: "SkillModel" } & Pick<SkillModel, "id" | "name">>
      >;
      rooms?: Maybe<
        Array<
          { __typename?: "UserMemberModel" } & Pick<
            UserMemberModel,
            "id" | "title" | "description" | "createdAt" | "recruitNumbers"
          > & {
              skills?: Maybe<
                Array<
                  { __typename?: "SkillModel" } & Pick<
                    SkillModel,
                    "id" | "name"
                  >
                >
              >;
              owner: { __typename?: "UserModel" } & Pick<
                UserModel,
                "id" | "name" | "avatar" | "userId"
              >;
              members?: Maybe<
                Array<
                  { __typename?: "RoomMemberModel" } & Pick<
                    RoomMemberModel,
                    "id" | "userId"
                  >
                >
              >;
            }
        >
      >;
    };
};

export type ThreadSubscriptionVariables = Exact<{
  channelId: Scalars["Int"];
}>;

export type ThreadSubscription = { __typename?: "Subscription" } & {
  threadAdded: { __typename?: "ThreadModel" } & Pick<
    ThreadModel,
    "id" | "text" | "createdAt" | "numberOfMessages"
  > & {
      channel: { __typename?: "ChannelModel" } & Pick<ChannelModel, "id">;
      user: { __typename?: "UserModel" } & Pick<
        UserModel,
        "id" | "name" | "avatar"
      >;
    };
};

export const ChannelItemFragmentDoc = gql`
  fragment ChannelItem on ChannelModel {
    id
    name
  }
`;
export const ChannelListFragmentDoc = gql`
  fragment ChannelList on UserMemberModel {
    channels {
      ...ChannelItem
    }
  }
  ${ChannelItemFragmentDoc}
`;
export const ChatItemFragmentDoc = gql`
  fragment ChatItem on ThreadModel {
    id
    text
    channel {
      id
    }
    user {
      id
      name
      avatar
    }
    createdAt
    numberOfMessages
  }
`;
export const RoomCardFragmentDoc = gql`
  fragment RoomCard on RoomModel {
    id
    title
    slug
    description
    icon
    recruitNumbers
    isRequired
    repositoryUrl
    createdAt
    members {
      id
      userId
      name
      avatar
      memberState
    }
    owner {
      id
      userId
      name
      avatar
    }
    skills {
      id
      name
    }
    categories {
      id
      name
    }
  }
`;
export const RoomItemFragmentDoc = gql`
  fragment RoomItem on UserMemberModel {
    id
    name
    icon
  }
`;
export const RoomTypesFragmentDoc = gql`
  fragment RoomTypes on RoomTypeModel {
    id
    name
  }
`;
export const SkillItemFragmentDoc = gql`
  fragment SkillItem on SkillModel {
    id
    name
  }
`;
export const CreateChannelDocument = gql`
  mutation CreateChannel($input: CreateChannelInput!) {
    createChannel(input: $input) {
      ...ChannelItem
    }
  }
  ${ChannelItemFragmentDoc}
`;
export type CreateChannelMutationFn = Apollo.MutationFunction<
  CreateChannelMutation,
  CreateChannelMutationVariables
>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >(CreateChannelDocument, baseOptions);
}
export type CreateChannelMutationHookResult = ReturnType<
  typeof useCreateChannelMutation
>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<
  CreateChannelMutation,
  CreateChannelMutationVariables
>;
export const CreateRoomDocument = gql`
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      title
      slug
    }
  }
`;
export type CreateRoomMutationFn = Apollo.MutationFunction<
  CreateRoomMutation,
  CreateRoomMutationVariables
>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateRoomMutation,
    CreateRoomMutationVariables
  >
) {
  return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(
    CreateRoomDocument,
    baseOptions
  );
}
export type CreateRoomMutationHookResult = ReturnType<
  typeof useCreateRoomMutation
>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<
  CreateRoomMutation,
  CreateRoomMutationVariables
>;
export const CreateThreadDocument = gql`
  mutation CreateThread($input: CreateThreadInput!) {
    createThread(input: $input) {
      ...ChatItem
    }
  }
  ${ChatItemFragmentDoc}
`;
export type CreateThreadMutationFn = Apollo.MutationFunction<
  CreateThreadMutation,
  CreateThreadMutationVariables
>;

/**
 * __useCreateThreadMutation__
 *
 * To run a mutation, you first call `useCreateThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThreadMutation, { data, loading, error }] = useCreateThreadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateThreadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateThreadMutation,
    CreateThreadMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateThreadMutation,
    CreateThreadMutationVariables
  >(CreateThreadDocument, baseOptions);
}
export type CreateThreadMutationHookResult = ReturnType<
  typeof useCreateThreadMutation
>;
export type CreateThreadMutationResult = Apollo.MutationResult<CreateThreadMutation>;
export type CreateThreadMutationOptions = Apollo.BaseMutationOptions<
  CreateThreadMutation,
  CreateThreadMutationVariables
>;
export const EditRoomDocument = gql`
  mutation EditRoom($input: UpdateRoomInput!) {
    updateRoom(updateRoomInput: $input) {
      id
      title
      slug
    }
  }
`;
export type EditRoomMutationFn = Apollo.MutationFunction<
  EditRoomMutation,
  EditRoomMutationVariables
>;

/**
 * __useEditRoomMutation__
 *
 * To run a mutation, you first call `useEditRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editRoomMutation, { data, loading, error }] = useEditRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditRoomMutation,
    EditRoomMutationVariables
  >
) {
  return Apollo.useMutation<EditRoomMutation, EditRoomMutationVariables>(
    EditRoomDocument,
    baseOptions
  );
}
export type EditRoomMutationHookResult = ReturnType<typeof useEditRoomMutation>;
export type EditRoomMutationResult = Apollo.MutationResult<EditRoomMutation>;
export type EditRoomMutationOptions = Apollo.BaseMutationOptions<
  EditRoomMutation,
  EditRoomMutationVariables
>;
export const EditThreadDocument = gql`
  mutation EditThread($input: UpdateThreadInput!) {
    updateThread(input: $input) {
      id
      text
    }
  }
`;
export type EditThreadMutationFn = Apollo.MutationFunction<
  EditThreadMutation,
  EditThreadMutationVariables
>;

/**
 * __useEditThreadMutation__
 *
 * To run a mutation, you first call `useEditThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editThreadMutation, { data, loading, error }] = useEditThreadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditThreadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditThreadMutation,
    EditThreadMutationVariables
  >
) {
  return Apollo.useMutation<EditThreadMutation, EditThreadMutationVariables>(
    EditThreadDocument,
    baseOptions
  );
}
export type EditThreadMutationHookResult = ReturnType<
  typeof useEditThreadMutation
>;
export type EditThreadMutationResult = Apollo.MutationResult<EditThreadMutation>;
export type EditThreadMutationOptions = Apollo.BaseMutationOptions<
  EditThreadMutation,
  EditThreadMutationVariables
>;
export const JoinRoomDocument = gql`
  mutation JoinRoom($roomId: Int!, $userId: Int!) {
    joinRoom(userId: $userId, roomId: $roomId) {
      id
      title
      members {
        id
        name
      }
    }
  }
`;
export type JoinRoomMutationFn = Apollo.MutationFunction<
  JoinRoomMutation,
  JoinRoomMutationVariables
>;

/**
 * __useJoinRoomMutation__
 *
 * To run a mutation, you first call `useJoinRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinRoomMutation, { data, loading, error }] = useJoinRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useJoinRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    JoinRoomMutation,
    JoinRoomMutationVariables
  >
) {
  return Apollo.useMutation<JoinRoomMutation, JoinRoomMutationVariables>(
    JoinRoomDocument,
    baseOptions
  );
}
export type JoinRoomMutationHookResult = ReturnType<typeof useJoinRoomMutation>;
export type JoinRoomMutationResult = Apollo.MutationResult<JoinRoomMutation>;
export type JoinRoomMutationOptions = Apollo.BaseMutationOptions<
  JoinRoomMutation,
  JoinRoomMutationVariables
>;
export const LeaveRoomDocument = gql`
  mutation LeaveRoom($roomId: Int!, $userId: Int!) {
    leaveRoom(userId: $userId, roomId: $roomId) {
      id
      title
      members {
        id
        name
      }
    }
  }
`;
export type LeaveRoomMutationFn = Apollo.MutationFunction<
  LeaveRoomMutation,
  LeaveRoomMutationVariables
>;

/**
 * __useLeaveRoomMutation__
 *
 * To run a mutation, you first call `useLeaveRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveRoomMutation, { data, loading, error }] = useLeaveRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useLeaveRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LeaveRoomMutation,
    LeaveRoomMutationVariables
  >
) {
  return Apollo.useMutation<LeaveRoomMutation, LeaveRoomMutationVariables>(
    LeaveRoomDocument,
    baseOptions
  );
}
export type LeaveRoomMutationHookResult = ReturnType<
  typeof useLeaveRoomMutation
>;
export type LeaveRoomMutationResult = Apollo.MutationResult<LeaveRoomMutation>;
export type LeaveRoomMutationOptions = Apollo.BaseMutationOptions<
  LeaveRoomMutation,
  LeaveRoomMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
      id
      userId
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    baseOptions
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const ApplyRoomDocument = gql`
  mutation ApplyRoom($roomId: Int!, $userId: Int!) {
    applyRoom(roomId: $roomId, userId: $userId) {
      id
      title
    }
  }
`;
export type ApplyRoomMutationFn = Apollo.MutationFunction<
  ApplyRoomMutation,
  ApplyRoomMutationVariables
>;

/**
 * __useApplyRoomMutation__
 *
 * To run a mutation, you first call `useApplyRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyRoomMutation, { data, loading, error }] = useApplyRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useApplyRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ApplyRoomMutation,
    ApplyRoomMutationVariables
  >
) {
  return Apollo.useMutation<ApplyRoomMutation, ApplyRoomMutationVariables>(
    ApplyRoomDocument,
    baseOptions
  );
}
export type ApplyRoomMutationHookResult = ReturnType<
  typeof useApplyRoomMutation
>;
export type ApplyRoomMutationResult = Apollo.MutationResult<ApplyRoomMutation>;
export type ApplyRoomMutationOptions = Apollo.BaseMutationOptions<
  ApplyRoomMutation,
  ApplyRoomMutationVariables
>;
export const ChatPageDocument = gql`
  query ChatPage($userId: String!) {
    user(userId: $userId) {
      rooms {
        ...RoomItem
        ...ChannelList
      }
    }
  }
  ${RoomItemFragmentDoc}
  ${ChannelListFragmentDoc}
`;

/**
 * __useChatPageQuery__
 *
 * To run a query within a React component, call `useChatPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatPageQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useChatPageQuery(
  baseOptions: Apollo.QueryHookOptions<ChatPageQuery, ChatPageQueryVariables>
) {
  return Apollo.useQuery<ChatPageQuery, ChatPageQueryVariables>(
    ChatPageDocument,
    baseOptions
  );
}
export function useChatPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ChatPageQuery,
    ChatPageQueryVariables
  >
) {
  return Apollo.useLazyQuery<ChatPageQuery, ChatPageQueryVariables>(
    ChatPageDocument,
    baseOptions
  );
}
export type ChatPageQueryHookResult = ReturnType<typeof useChatPageQuery>;
export type ChatPageLazyQueryHookResult = ReturnType<
  typeof useChatPageLazyQuery
>;
export type ChatPageQueryResult = Apollo.QueryResult<
  ChatPageQuery,
  ChatPageQueryVariables
>;
export const CreateRoomPageDocument = gql`
  query CreateRoomPage {
    categories {
      id
      name
    }
    skills {
      id
      name
      icon
    }
    roomTypes {
      id
      name
    }
  }
`;

/**
 * __useCreateRoomPageQuery__
 *
 * To run a query within a React component, call `useCreateRoomPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreateRoomPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useCreateRoomPageQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CreateRoomPageQuery,
    CreateRoomPageQueryVariables
  >
) {
  return Apollo.useQuery<CreateRoomPageQuery, CreateRoomPageQueryVariables>(
    CreateRoomPageDocument,
    baseOptions
  );
}
export function useCreateRoomPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CreateRoomPageQuery,
    CreateRoomPageQueryVariables
  >
) {
  return Apollo.useLazyQuery<CreateRoomPageQuery, CreateRoomPageQueryVariables>(
    CreateRoomPageDocument,
    baseOptions
  );
}
export type CreateRoomPageQueryHookResult = ReturnType<
  typeof useCreateRoomPageQuery
>;
export type CreateRoomPageLazyQueryHookResult = ReturnType<
  typeof useCreateRoomPageLazyQuery
>;
export type CreateRoomPageQueryResult = Apollo.QueryResult<
  CreateRoomPageQuery,
  CreateRoomPageQueryVariables
>;
export const RoomEditPageDocument = gql`
  query RoomEditPage($slug: String!) {
    room(slug: $slug) {
      id
      title
      name
      slug
      description
      icon
      recruitNumbers
      isRequired
      repositoryUrl
      members {
        id
        name
        avatar
      }
      owner {
        id
        name
        avatar
      }
      skills {
        id
        name
      }
      categories {
        id
        name
      }
      types {
        id
        name
      }
    }
    categories {
      id
      name
    }
    skills {
      id
      name
    }
    roomTypes {
      id
      name
    }
  }
`;

/**
 * __useRoomEditPageQuery__
 *
 * To run a query within a React component, call `useRoomEditPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomEditPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomEditPageQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useRoomEditPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    RoomEditPageQuery,
    RoomEditPageQueryVariables
  >
) {
  return Apollo.useQuery<RoomEditPageQuery, RoomEditPageQueryVariables>(
    RoomEditPageDocument,
    baseOptions
  );
}
export function useRoomEditPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RoomEditPageQuery,
    RoomEditPageQueryVariables
  >
) {
  return Apollo.useLazyQuery<RoomEditPageQuery, RoomEditPageQueryVariables>(
    RoomEditPageDocument,
    baseOptions
  );
}
export type RoomEditPageQueryHookResult = ReturnType<
  typeof useRoomEditPageQuery
>;
export type RoomEditPageLazyQueryHookResult = ReturnType<
  typeof useRoomEditPageLazyQuery
>;
export type RoomEditPageQueryResult = Apollo.QueryResult<
  RoomEditPageQuery,
  RoomEditPageQueryVariables
>;
export const EditUserPageDocument = gql`
  query EditUserPage($userId: String!) {
    user(userId: $userId) {
      id
      userId
      name
      avatar
      introduction
      githubId
      twitterId
      skills {
        id
        name
      }
      rooms {
        id
        title
        description
        createdAt
        recruitNumbers
        skills {
          id
          name
        }
        owner {
          id
          name
          avatar
          userId
        }
        members {
          id
          userId
        }
      }
    }
    skills {
      id
      name
    }
  }
`;

/**
 * __useEditUserPageQuery__
 *
 * To run a query within a React component, call `useEditUserPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditUserPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditUserPageQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useEditUserPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    EditUserPageQuery,
    EditUserPageQueryVariables
  >
) {
  return Apollo.useQuery<EditUserPageQuery, EditUserPageQueryVariables>(
    EditUserPageDocument,
    baseOptions
  );
}
export function useEditUserPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EditUserPageQuery,
    EditUserPageQueryVariables
  >
) {
  return Apollo.useLazyQuery<EditUserPageQuery, EditUserPageQueryVariables>(
    EditUserPageDocument,
    baseOptions
  );
}
export type EditUserPageQueryHookResult = ReturnType<
  typeof useEditUserPageQuery
>;
export type EditUserPageLazyQueryHookResult = ReturnType<
  typeof useEditUserPageLazyQuery
>;
export type EditUserPageQueryResult = Apollo.QueryResult<
  EditUserPageQuery,
  EditUserPageQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      userId
      name
      avatar
      skills {
        ...SkillItem
      }
    }
  }
  ${SkillItemFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RoomDocument = gql`
  query Room($slug: String!) {
    room(slug: $slug) {
      id
      title
      name
      description
      icon
      recruitNumbers
      isRequired
      repositoryUrl
      members {
        id
        userId
        name
        avatar
        memberState
      }
      owner {
        id
        userId
        name
        avatar
      }
      skills {
        id
        name
      }
      categories {
        id
        name
      }
    }
  }
`;

/**
 * __useRoomQuery__
 *
 * To run a query within a React component, call `useRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useRoomQuery(
  baseOptions: Apollo.QueryHookOptions<RoomQuery, RoomQueryVariables>
) {
  return Apollo.useQuery<RoomQuery, RoomQueryVariables>(
    RoomDocument,
    baseOptions
  );
}
export function useRoomLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RoomQuery, RoomQueryVariables>
) {
  return Apollo.useLazyQuery<RoomQuery, RoomQueryVariables>(
    RoomDocument,
    baseOptions
  );
}
export type RoomQueryHookResult = ReturnType<typeof useRoomQuery>;
export type RoomLazyQueryHookResult = ReturnType<typeof useRoomLazyQuery>;
export type RoomQueryResult = Apollo.QueryResult<RoomQuery, RoomQueryVariables>;
export const RoomsDocument = gql`
  query Rooms($input: SearchRoomInput) {
    rooms(input: $input) {
      ...RoomCard
    }
    roomTypes {
      ...RoomTypes
    }
  }
  ${RoomCardFragmentDoc}
  ${RoomTypesFragmentDoc}
`;

/**
 * __useRoomsQuery__
 *
 * To run a query within a React component, call `useRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRoomsQuery(
  baseOptions?: Apollo.QueryHookOptions<RoomsQuery, RoomsQueryVariables>
) {
  return Apollo.useQuery<RoomsQuery, RoomsQueryVariables>(
    RoomsDocument,
    baseOptions
  );
}
export function useRoomsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RoomsQuery, RoomsQueryVariables>
) {
  return Apollo.useLazyQuery<RoomsQuery, RoomsQueryVariables>(
    RoomsDocument,
    baseOptions
  );
}
export type RoomsQueryHookResult = ReturnType<typeof useRoomsQuery>;
export type RoomsLazyQueryHookResult = ReturnType<typeof useRoomsLazyQuery>;
export type RoomsQueryResult = Apollo.QueryResult<
  RoomsQuery,
  RoomsQueryVariables
>;
export const SearchConditionsDocument = gql`
  query SearchConditions {
    categories {
      id
      name
    }
    skills {
      icon
      id
      name
    }
  }
`;

/**
 * __useSearchConditionsQuery__
 *
 * To run a query within a React component, call `useSearchConditionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchConditionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchConditionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSearchConditionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SearchConditionsQuery,
    SearchConditionsQueryVariables
  >
) {
  return Apollo.useQuery<SearchConditionsQuery, SearchConditionsQueryVariables>(
    SearchConditionsDocument,
    baseOptions
  );
}
export function useSearchConditionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchConditionsQuery,
    SearchConditionsQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    SearchConditionsQuery,
    SearchConditionsQueryVariables
  >(SearchConditionsDocument, baseOptions);
}
export type SearchConditionsQueryHookResult = ReturnType<
  typeof useSearchConditionsQuery
>;
export type SearchConditionsLazyQueryHookResult = ReturnType<
  typeof useSearchConditionsLazyQuery
>;
export type SearchConditionsQueryResult = Apollo.QueryResult<
  SearchConditionsQuery,
  SearchConditionsQueryVariables
>;
export const ThreadListDocument = gql`
  query ThreadList($input: FetchThreadInput!) {
    threads(input: $input) {
      ...ChatItem
    }
  }
  ${ChatItemFragmentDoc}
`;

/**
 * __useThreadListQuery__
 *
 * To run a query within a React component, call `useThreadListQuery` and pass it any options that fit your needs.
 * When your component renders, `useThreadListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useThreadListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useThreadListQuery(
  baseOptions: Apollo.QueryHookOptions<
    ThreadListQuery,
    ThreadListQueryVariables
  >
) {
  return Apollo.useQuery<ThreadListQuery, ThreadListQueryVariables>(
    ThreadListDocument,
    baseOptions
  );
}
export function useThreadListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ThreadListQuery,
    ThreadListQueryVariables
  >
) {
  return Apollo.useLazyQuery<ThreadListQuery, ThreadListQueryVariables>(
    ThreadListDocument,
    baseOptions
  );
}
export type ThreadListQueryHookResult = ReturnType<typeof useThreadListQuery>;
export type ThreadListLazyQueryHookResult = ReturnType<
  typeof useThreadListLazyQuery
>;
export type ThreadListQueryResult = Apollo.QueryResult<
  ThreadListQuery,
  ThreadListQueryVariables
>;
export const UserDetailPageDocument = gql`
  query UserDetailPage($userId: String!) {
    user(userId: $userId) {
      id
      userId
      name
      avatar
      introduction
      githubId
      twitterId
      skills {
        id
        name
      }
      rooms {
        id
        title
        description
        createdAt
        recruitNumbers
        skills {
          id
          name
        }
        owner {
          id
          name
          avatar
          userId
        }
        members {
          id
          userId
        }
      }
    }
  }
`;

/**
 * __useUserDetailPageQuery__
 *
 * To run a query within a React component, call `useUserDetailPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDetailPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDetailPageQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserDetailPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserDetailPageQuery,
    UserDetailPageQueryVariables
  >
) {
  return Apollo.useQuery<UserDetailPageQuery, UserDetailPageQueryVariables>(
    UserDetailPageDocument,
    baseOptions
  );
}
export function useUserDetailPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserDetailPageQuery,
    UserDetailPageQueryVariables
  >
) {
  return Apollo.useLazyQuery<UserDetailPageQuery, UserDetailPageQueryVariables>(
    UserDetailPageDocument,
    baseOptions
  );
}
export type UserDetailPageQueryHookResult = ReturnType<
  typeof useUserDetailPageQuery
>;
export type UserDetailPageLazyQueryHookResult = ReturnType<
  typeof useUserDetailPageLazyQuery
>;
export type UserDetailPageQueryResult = Apollo.QueryResult<
  UserDetailPageQuery,
  UserDetailPageQueryVariables
>;
export const ThreadDocument = gql`
  subscription Thread($channelId: Int!) {
    threadAdded(channelId: $channelId) {
      id
      text
      channel {
        id
      }
      user {
        id
        name
        avatar
      }
      createdAt
      numberOfMessages
    }
  }
`;

/**
 * __useThreadSubscription__
 *
 * To run a query within a React component, call `useThreadSubscription` and pass it any options that fit your needs.
 * When your component renders, `useThreadSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useThreadSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useThreadSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    ThreadSubscription,
    ThreadSubscriptionVariables
  >
) {
  return Apollo.useSubscription<
    ThreadSubscription,
    ThreadSubscriptionVariables
  >(ThreadDocument, baseOptions);
}
export type ThreadSubscriptionHookResult = ReturnType<
  typeof useThreadSubscription
>;
export type ThreadSubscriptionResult = Apollo.SubscriptionResult<ThreadSubscription>;
