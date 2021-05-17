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

export type CategoryModel = {
  __typename?: "CategoryModel";
  id: Scalars["Int"];
  name: Scalars["String"];
  rooms: Array<RoomModel>;
};

export type CreateCategoryInput = {
  name: Scalars["String"];
};

export type CreateMessageInput = {
  opponentSlug: Scalars["String"];
  text: Scalars["String"];
};

export type CreateRoomInput = {
  categories: Array<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
  icon?: Maybe<Scalars["String"]>;
  invidationUrl?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  owner: Scalars["Int"];
  recruiementLevels: Array<Scalars["Int"]>;
  repositoryUrl?: Maybe<Scalars["String"]>;
  skills?: Maybe<Array<Scalars["Int"]>>;
  slug: Scalars["String"];
  title: Scalars["String"];
  typeIds: Array<Scalars["Int"]>;
  withApplication: Scalars["Boolean"];
};

export type CreateSkillInput = {
  icon: Scalars["String"];
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type FetchMessageInput = {
  cursor: Scalars["DateTime"];
  opponentSlug: Scalars["String"];
};

export type MessageModel = {
  __typename?: "MessageModel";
  createdAt: Scalars["DateTime"];
  id: Scalars["Int"];
  receiver: UserModel;
  sender: UserModel;
  text: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  acceptApplication: RoomModel;
  applyRoom: RoomModel;
  createCategory: CategoryModel;
  createMessage: MessageModel;
  createRoom: RoomModel;
  createSkill: SkillModel;
  deleteRoom: RoomModel;
  rejectApplication: RoomModel;
  removeCategory: CategoryModel;
  removeSkill: SkillModel;
  updateCategory: CategoryModel;
  updateMessage: MessageModel;
  updateRoom: RoomModel;
  updateSkill: SkillModel;
  updateUser: UserModel;
};

export type MutationAcceptApplicationArgs = {
  roomId: Scalars["Int"];
  userId: Scalars["Int"];
};

export type MutationApplyRoomArgs = {
  roomId: Scalars["Int"];
  userId: Scalars["Int"];
};

export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
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

export type MutationDeleteRoomArgs = {
  id: Scalars["Int"];
};

export type MutationRejectApplicationArgs = {
  roomId: Scalars["Int"];
  userId: Scalars["Int"];
};

export type MutationRemoveCategoryArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveSkillArgs = {
  id: Scalars["Int"];
};

export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};

export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput;
};

export type MutationUpdateRoomArgs = {
  input: UpdateRoomInput;
};

export type MutationUpdateSkillArgs = {
  updateSkillInput: UpdateSkillInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type MyRoomsInput = {
  iAmOwner?: Maybe<Scalars["Boolean"]>;
  state?: Maybe<State>;
};

export type Query = {
  __typename?: "Query";
  categories: Array<CategoryModel>;
  category: CategoryModel;
  me: UserModel;
  message: MessageModel;
  messages: Array<MessageModel>;
  myRooms: Array<RoomModel>;
  opponents: Array<RoomModel>;
  recruitmentLevels: Array<RecruitmentLevelModel>;
  room: RoomModel;
  rooms: Array<RoomModel>;
  roomTypes: Array<RoomTypeModel>;
  skill: SkillModel;
  skills: Array<SkillModel>;
  user: UserModel;
  users: Array<UserModel>;
};

export type QueryCategoryArgs = {
  id: Scalars["Int"];
};

export type QueryMessageArgs = {
  id: Scalars["Int"];
};

export type QueryMessagesArgs = {
  input: FetchMessageInput;
};

export type QueryMyRoomsArgs = {
  input: MyRoomsInput;
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

export type QueryUserArgs = {
  userId: Scalars["String"];
};

export type RecruitmentLevelModel = {
  __typename?: "RecruitmentLevelModel";
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type RoomApplyingUserModel = {
  __typename?: "RoomApplyingUserModel";
  room: RoomModel;
  state: State;
  user: UserModel;
};

export type RoomModel = {
  __typename?: "RoomModel";
  applyingUsers?: Maybe<Array<RoomApplyingUserModel>>;
  categories: Array<CategoryModel>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  icon?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
  invidationUrl?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  owner: UserModel;
  recruitmentLevels: Array<RecruitmentLevelModel>;
  repositoryUrl?: Maybe<Scalars["String"]>;
  skills?: Maybe<Array<SkillModel>>;
  slug: Scalars["String"];
  title: Scalars["String"];
  types: Array<RoomTypeModel>;
  withApplication: Scalars["Boolean"];
};

export type RoomTypeModel = {
  __typename?: "RoomTypeModel";
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type SearchRoomInput = {
  categoryIds?: Maybe<Array<Scalars["Int"]>>;
  keyword?: Maybe<Scalars["String"]>;
  recruitmentLevelIds?: Maybe<Array<Scalars["Int"]>>;
  skillIds?: Maybe<Array<Scalars["Int"]>>;
  typeId?: Maybe<Scalars["Int"]>;
  userSlug?: Maybe<Scalars["String"]>;
  withApplication?: Maybe<Scalars["Boolean"]>;
};

export type SkillModel = {
  __typename?: "SkillModel";
  icon?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  name: Scalars["String"];
};

export enum State {
  Applying = "APPLYING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

export type Subscription = {
  __typename?: "Subscription";
  messageAdded: MessageModel;
};

export type SubscriptionMessageAddedArgs = {
  slug: Scalars["String"];
};

export type UpdateCategoryInput = {
  id: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
};

export type UpdateMessageInput = {
  id: Scalars["Int"];
  opponentSlug?: Maybe<Scalars["String"]>;
  text?: Maybe<Scalars["String"]>;
};

export type UpdateRoomInput = {
  categories?: Maybe<Array<Scalars["Int"]>>;
  description?: Maybe<Scalars["String"]>;
  icon?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  invidationUrl?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  owner?: Maybe<Scalars["Int"]>;
  recruiementLevels?: Maybe<Array<Scalars["Int"]>>;
  repositoryUrl?: Maybe<Scalars["String"]>;
  skills?: Maybe<Array<Scalars["Int"]>>;
  slug?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  typeIds?: Maybe<Array<Scalars["Int"]>>;
  withApplication?: Maybe<Scalars["Boolean"]>;
};

export type UpdateSkillInput = {
  icon?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
};

export type UpdateUserInput = {
  avatar?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  githubId?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  introduction?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  skills?: Maybe<Array<Scalars["Int"]>>;
  twitterId?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["String"]>;
};

export type UserModel = {
  __typename?: "UserModel";
  avatar?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  githubId?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  introduction?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  ownerTeams?: Maybe<Array<RoomModel>>;
  skills?: Maybe<Array<SkillModel>>;
  twitterId?: Maybe<Scalars["String"]>;
  userId: Scalars["String"];
};

export type MessageTimelineFragment = { __typename?: "UserModel" } & Pick<
  UserModel,
  "id" | "userId" | "name" | "avatar"
>;

export type MessageFragment = { __typename?: "MessageModel" } & Pick<
  MessageModel,
  "id" | "text" | "createdAt"
> & {
    sender: { __typename?: "UserModel" } & Pick<
      UserModel,
      "id" | "avatar" | "name" | "userId"
    >;
  };

export type ReceivedApplyingCardFragment = { __typename?: "UserModel" } & Pick<
  UserModel,
  "id" | "name" | "avatar" | "userId"
>;

export type RoomCardFragment = { __typename?: "RoomModel" } & Pick<
  RoomModel,
  | "id"
  | "title"
  | "slug"
  | "description"
  | "icon"
  | "withApplication"
  | "repositoryUrl"
  | "createdAt"
> & {
    owner: { __typename?: "UserModel" } & Pick<
      UserModel,
      "id" | "userId" | "name" | "avatar"
    >;
    skills?: Maybe<
      Array<{ __typename?: "SkillModel" } & Pick<SkillModel, "id" | "name">>
    >;
  };

export type RoomOperationCardFragment = { __typename?: "RoomModel" } & Pick<
  RoomModel,
  "id" | "name" | "icon" | "slug"
>;

export type RoomTypesFragment = { __typename?: "RoomTypeModel" } & Pick<
  RoomTypeModel,
  "id" | "name"
>;

export type SkillItemFragment = { __typename?: "SkillModel" } & Pick<
  SkillModel,
  "id" | "name"
>;

export type UserInfoFragment = { __typename?: "UserModel" } & Pick<
  UserModel,
  "id" | "avatar" | "name" | "userId"
>;

export type AcceptApplicationMutationVariables = Exact<{
  roomId: Scalars["Int"];
  userId: Scalars["Int"];
}>;

export type AcceptApplicationMutation = { __typename?: "Mutation" } & {
  acceptApplication: { __typename?: "RoomModel" } & Pick<RoomModel, "id">;
};

export type ApplyRoomMutationVariables = Exact<{
  roomId: Scalars["Int"];
  userId: Scalars["Int"];
}>;

export type ApplyRoomMutation = { __typename?: "Mutation" } & {
  applyRoom: { __typename?: "RoomModel" } & Pick<RoomModel, "id" | "title">;
};

export type CreateRoomMutationVariables = Exact<{
  input: CreateRoomInput;
}>;

export type CreateRoomMutation = { __typename?: "Mutation" } & {
  createRoom: { __typename?: "RoomModel" } & RoomCardFragment;
};

export type DeleteRoomMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteRoomMutation = { __typename?: "Mutation" } & {
  deleteRoom: { __typename?: "RoomModel" } & Pick<RoomModel, "id">;
};

export type EditRoomMutationVariables = Exact<{
  input: UpdateRoomInput;
}>;

export type EditRoomMutation = { __typename?: "Mutation" } & {
  updateRoom: { __typename?: "RoomModel" } & Pick<
    RoomModel,
    | "id"
    | "slug"
    | "title"
    | "name"
    | "description"
    | "icon"
    | "withApplication"
    | "repositoryUrl"
    | "invidationUrl"
  > & {
      recruitmentLevels: Array<
        { __typename?: "RecruitmentLevelModel" } & Pick<
          RecruitmentLevelModel,
          "id" | "name"
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

export type RejectApplicationMutationVariables = Exact<{
  roomId: Scalars["Int"];
  userId: Scalars["Int"];
}>;

export type RejectApplicationMutation = { __typename?: "Mutation" } & {
  rejectApplication: { __typename?: "RoomModel" } & Pick<RoomModel, "id">;
};

export type SendMessageMutationVariables = Exact<{
  text: Scalars["String"];
  opponentSlug: Scalars["String"];
}>;

export type SendMessageMutation = { __typename?: "Mutation" } & {
  createMessage: { __typename?: "MessageModel" } & MessageFragment;
};

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;

export type UpdateUserMutation = { __typename?: "Mutation" } & {
  updateUser: { __typename?: "UserModel" } & Pick<
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
    | "withApplication"
    | "repositoryUrl"
    | "invidationUrl"
  > & {
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
      recruitmentLevels: Array<
        { __typename?: "RecruitmentLevelModel" } & Pick<
          RecruitmentLevelModel,
          "id" | "name"
        >
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
  recruitmentLevels: Array<
    { __typename?: "RecruitmentLevelModel" } & Pick<
      RecruitmentLevelModel,
      "id" | "name"
    >
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

export type MessageTimelinesQueryVariables = Exact<{ [key: string]: never }>;

export type MessageTimelinesQuery = { __typename?: "Query" } & {
  opponents: Array<
    { __typename?: "RoomModel" } & Pick<RoomModel, "id" | "name"> & {
        owner: { __typename?: "UserModel" } & MessageTimelineFragment;
        applyingUsers?: Maybe<
          Array<
            { __typename?: "RoomApplyingUserModel" } & {
              user: { __typename?: "UserModel" } & MessageTimelineFragment;
            }
          >
        >;
      }
  >;
};

export type MessagesQueryVariables = Exact<{
  input: FetchMessageInput;
}>;

export type MessagesQuery = { __typename?: "Query" } & {
  messages: Array<{ __typename?: "MessageModel" } & MessageFragment>;
};

export type OpponentUserQueryVariables = Exact<{
  slug: Scalars["String"];
}>;

export type OpponentUserQuery = { __typename?: "Query" } & {
  user: { __typename?: "UserModel" } & UserInfoFragment;
};

export type ReceivedApplyingQueryVariables = Exact<{ [key: string]: never }>;

export type ReceivedApplyingQuery = { __typename?: "Query" } & {
  myRooms: Array<
    { __typename?: "RoomModel" } & Pick<RoomModel, "id" | "name"> & {
        applyingUsers?: Maybe<
          Array<
            { __typename?: "RoomApplyingUserModel" } & {
              user: { __typename?: "UserModel" } & ReceivedApplyingCardFragment;
            }
          >
        >;
      }
  >;
};

export type RoomQueryVariables = Exact<{
  slug: Scalars["String"];
  isMine: Scalars["Boolean"];
}>;

export type RoomQuery = { __typename?: "Query" } & {
  room: { __typename?: "RoomModel" } & Pick<
    RoomModel,
    | "id"
    | "title"
    | "name"
    | "description"
    | "icon"
    | "withApplication"
    | "repositoryUrl"
    | "invidationUrl"
  > & {
      applyingUsers?: Maybe<
        Array<
          { __typename?: "RoomApplyingUserModel" } & {
            user: { __typename?: "UserModel" } & Pick<
              UserModel,
              "id" | "userId"
            >;
          }
        >
      >;
      recruitmentLevels: Array<
        { __typename?: "RecruitmentLevelModel" } & Pick<
          RecruitmentLevelModel,
          "id" | "name"
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
      types: Array<
        { __typename?: "RoomTypeModel" } & Pick<RoomTypeModel, "id" | "name">
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
  recruitmentLevels: Array<
    { __typename?: "RecruitmentLevelModel" } & Pick<
      RecruitmentLevelModel,
      "id" | "name"
    >
  >;
  roomTypes: Array<
    { __typename?: "RoomTypeModel" } & Pick<RoomTypeModel, "id" | "name">
  >;
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
    };
  rooms: Array<{ __typename?: "RoomModel" } & RoomCardFragment>;
};

export type MessageAddedSubscriptionVariables = Exact<{
  slug: Scalars["String"];
}>;

export type MessageAddedSubscription = { __typename?: "Subscription" } & {
  messageAdded: { __typename?: "MessageModel" } & MessageFragment;
};

export const MessageTimelineFragmentDoc = gql`
  fragment MessageTimeline on UserModel {
    id
    userId
    name
    avatar
  }
`;
export const MessageFragmentDoc = gql`
  fragment Message on MessageModel {
    id
    text
    createdAt
    sender {
      id
      avatar
      name
      userId
    }
  }
`;
export const ReceivedApplyingCardFragmentDoc = gql`
  fragment ReceivedApplyingCard on UserModel {
    id
    name
    avatar
    userId
  }
`;
export const RoomCardFragmentDoc = gql`
  fragment RoomCard on RoomModel {
    id
    title
    slug
    description
    icon
    withApplication
    repositoryUrl
    createdAt
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
  }
`;
export const RoomOperationCardFragmentDoc = gql`
  fragment RoomOperationCard on RoomModel {
    id
    name
    icon
    slug
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
export const UserInfoFragmentDoc = gql`
  fragment UserInfo on UserModel {
    id
    avatar
    name
    userId
  }
`;
export const AcceptApplicationDocument = gql`
  mutation AcceptApplication($roomId: Int!, $userId: Int!) {
    acceptApplication(roomId: $roomId, userId: $userId) {
      id
    }
  }
`;
export type AcceptApplicationMutationFn = Apollo.MutationFunction<
  AcceptApplicationMutation,
  AcceptApplicationMutationVariables
>;

/**
 * __useAcceptApplicationMutation__
 *
 * To run a mutation, you first call `useAcceptApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptApplicationMutation, { data, loading, error }] = useAcceptApplicationMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAcceptApplicationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AcceptApplicationMutation,
    AcceptApplicationMutationVariables
  >
) {
  return Apollo.useMutation<
    AcceptApplicationMutation,
    AcceptApplicationMutationVariables
  >(AcceptApplicationDocument, baseOptions);
}
export type AcceptApplicationMutationHookResult = ReturnType<
  typeof useAcceptApplicationMutation
>;
export type AcceptApplicationMutationResult = Apollo.MutationResult<AcceptApplicationMutation>;
export type AcceptApplicationMutationOptions = Apollo.BaseMutationOptions<
  AcceptApplicationMutation,
  AcceptApplicationMutationVariables
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
export const CreateRoomDocument = gql`
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      ...RoomCard
    }
  }
  ${RoomCardFragmentDoc}
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
export const DeleteRoomDocument = gql`
  mutation DeleteRoom($id: Int!) {
    deleteRoom(id: $id) {
      id
    }
  }
`;
export type DeleteRoomMutationFn = Apollo.MutationFunction<
  DeleteRoomMutation,
  DeleteRoomMutationVariables
>;

/**
 * __useDeleteRoomMutation__
 *
 * To run a mutation, you first call `useDeleteRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoomMutation, { data, loading, error }] = useDeleteRoomMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteRoomMutation,
    DeleteRoomMutationVariables
  >
) {
  return Apollo.useMutation<DeleteRoomMutation, DeleteRoomMutationVariables>(
    DeleteRoomDocument,
    baseOptions
  );
}
export type DeleteRoomMutationHookResult = ReturnType<
  typeof useDeleteRoomMutation
>;
export type DeleteRoomMutationResult = Apollo.MutationResult<DeleteRoomMutation>;
export type DeleteRoomMutationOptions = Apollo.BaseMutationOptions<
  DeleteRoomMutation,
  DeleteRoomMutationVariables
>;
export const EditRoomDocument = gql`
  mutation EditRoom($input: UpdateRoomInput!) {
    updateRoom(input: $input) {
      id
      slug
      title
      name
      description
      icon
      withApplication
      repositoryUrl
      invidationUrl
      recruitmentLevels {
        id
        name
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
export const RejectApplicationDocument = gql`
  mutation RejectApplication($roomId: Int!, $userId: Int!) {
    rejectApplication(roomId: $roomId, userId: $userId) {
      id
    }
  }
`;
export type RejectApplicationMutationFn = Apollo.MutationFunction<
  RejectApplicationMutation,
  RejectApplicationMutationVariables
>;

/**
 * __useRejectApplicationMutation__
 *
 * To run a mutation, you first call `useRejectApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectApplicationMutation, { data, loading, error }] = useRejectApplicationMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRejectApplicationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RejectApplicationMutation,
    RejectApplicationMutationVariables
  >
) {
  return Apollo.useMutation<
    RejectApplicationMutation,
    RejectApplicationMutationVariables
  >(RejectApplicationDocument, baseOptions);
}
export type RejectApplicationMutationHookResult = ReturnType<
  typeof useRejectApplicationMutation
>;
export type RejectApplicationMutationResult = Apollo.MutationResult<RejectApplicationMutation>;
export type RejectApplicationMutationOptions = Apollo.BaseMutationOptions<
  RejectApplicationMutation,
  RejectApplicationMutationVariables
>;
export const SendMessageDocument = gql`
  mutation SendMessage($text: String!, $opponentSlug: String!) {
    createMessage(input: { text: $text, opponentSlug: $opponentSlug }) {
      ...Message
    }
  }
  ${MessageFragmentDoc}
`;
export type SendMessageMutationFn = Apollo.MutationFunction<
  SendMessageMutation,
  SendMessageMutationVariables
>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      text: // value for 'text'
 *      opponentSlug: // value for 'opponentSlug'
 *   },
 * });
 */
export function useSendMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendMessageMutation,
    SendMessageMutationVariables
  >
) {
  return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(
    SendMessageDocument,
    baseOptions
  );
}
export type SendMessageMutationHookResult = ReturnType<
  typeof useSendMessageMutation
>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<
  SendMessageMutation,
  SendMessageMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
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
      withApplication
      repositoryUrl
      invidationUrl
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
      recruitmentLevels {
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
    recruitmentLevels {
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
export const MessageTimelinesDocument = gql`
  query MessageTimelines {
    opponents {
      id
      name
      owner {
        ...MessageTimeline
      }
      applyingUsers {
        user {
          ...MessageTimeline
        }
      }
    }
  }
  ${MessageTimelineFragmentDoc}
`;

/**
 * __useMessageTimelinesQuery__
 *
 * To run a query within a React component, call `useMessageTimelinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessageTimelinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageTimelinesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMessageTimelinesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MessageTimelinesQuery,
    MessageTimelinesQueryVariables
  >
) {
  return Apollo.useQuery<MessageTimelinesQuery, MessageTimelinesQueryVariables>(
    MessageTimelinesDocument,
    baseOptions
  );
}
export function useMessageTimelinesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MessageTimelinesQuery,
    MessageTimelinesQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    MessageTimelinesQuery,
    MessageTimelinesQueryVariables
  >(MessageTimelinesDocument, baseOptions);
}
export type MessageTimelinesQueryHookResult = ReturnType<
  typeof useMessageTimelinesQuery
>;
export type MessageTimelinesLazyQueryHookResult = ReturnType<
  typeof useMessageTimelinesLazyQuery
>;
export type MessageTimelinesQueryResult = Apollo.QueryResult<
  MessageTimelinesQuery,
  MessageTimelinesQueryVariables
>;
export const MessagesDocument = gql`
  query Messages($input: FetchMessageInput!) {
    messages(input: $input) {
      ...Message
    }
  }
  ${MessageFragmentDoc}
`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMessagesQuery(
  baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>
) {
  return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(
    MessagesDocument,
    baseOptions
  );
}
export function useMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MessagesQuery,
    MessagesQueryVariables
  >
) {
  return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(
    MessagesDocument,
    baseOptions
  );
}
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<
  typeof useMessagesLazyQuery
>;
export type MessagesQueryResult = Apollo.QueryResult<
  MessagesQuery,
  MessagesQueryVariables
>;
export const OpponentUserDocument = gql`
  query OpponentUser($slug: String!) {
    user(userId: $slug) {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`;

/**
 * __useOpponentUserQuery__
 *
 * To run a query within a React component, call `useOpponentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpponentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpponentUserQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useOpponentUserQuery(
  baseOptions: Apollo.QueryHookOptions<
    OpponentUserQuery,
    OpponentUserQueryVariables
  >
) {
  return Apollo.useQuery<OpponentUserQuery, OpponentUserQueryVariables>(
    OpponentUserDocument,
    baseOptions
  );
}
export function useOpponentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OpponentUserQuery,
    OpponentUserQueryVariables
  >
) {
  return Apollo.useLazyQuery<OpponentUserQuery, OpponentUserQueryVariables>(
    OpponentUserDocument,
    baseOptions
  );
}
export type OpponentUserQueryHookResult = ReturnType<
  typeof useOpponentUserQuery
>;
export type OpponentUserLazyQueryHookResult = ReturnType<
  typeof useOpponentUserLazyQuery
>;
export type OpponentUserQueryResult = Apollo.QueryResult<
  OpponentUserQuery,
  OpponentUserQueryVariables
>;
export const ReceivedApplyingDocument = gql`
  query ReceivedApplying {
    myRooms(input: { iAmOwner: true, state: APPLYING }) {
      id
      name
      applyingUsers {
        user {
          ...ReceivedApplyingCard
        }
      }
    }
  }
  ${ReceivedApplyingCardFragmentDoc}
`;

/**
 * __useReceivedApplyingQuery__
 *
 * To run a query within a React component, call `useReceivedApplyingQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceivedApplyingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceivedApplyingQuery({
 *   variables: {
 *   },
 * });
 */
export function useReceivedApplyingQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ReceivedApplyingQuery,
    ReceivedApplyingQueryVariables
  >
) {
  return Apollo.useQuery<ReceivedApplyingQuery, ReceivedApplyingQueryVariables>(
    ReceivedApplyingDocument,
    baseOptions
  );
}
export function useReceivedApplyingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ReceivedApplyingQuery,
    ReceivedApplyingQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    ReceivedApplyingQuery,
    ReceivedApplyingQueryVariables
  >(ReceivedApplyingDocument, baseOptions);
}
export type ReceivedApplyingQueryHookResult = ReturnType<
  typeof useReceivedApplyingQuery
>;
export type ReceivedApplyingLazyQueryHookResult = ReturnType<
  typeof useReceivedApplyingLazyQuery
>;
export type ReceivedApplyingQueryResult = Apollo.QueryResult<
  ReceivedApplyingQuery,
  ReceivedApplyingQueryVariables
>;
export const RoomDocument = gql`
  query Room($slug: String!, $isMine: Boolean!) {
    room(slug: $slug) @include(if: $isMine) {
      id
      title
      name
      description
      icon
      withApplication
      repositoryUrl
      invidationUrl
      applyingUsers {
        user {
          id
          userId
        }
      }
      recruitmentLevels {
        id
        name
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
      types {
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
 *      isMine: // value for 'isMine'
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
    recruitmentLevels {
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
    }
    rooms(input: { userSlug: $userId }) {
      ...RoomCard
    }
  }
  ${RoomCardFragmentDoc}
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
export const MessageAddedDocument = gql`
  subscription MessageAdded($slug: String!) {
    messageAdded(slug: $slug) {
      ...Message
    }
  }
  ${MessageFragmentDoc}
`;

/**
 * __useMessageAddedSubscription__
 *
 * To run a query within a React component, call `useMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageAddedSubscription({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useMessageAddedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    MessageAddedSubscription,
    MessageAddedSubscriptionVariables
  >
) {
  return Apollo.useSubscription<
    MessageAddedSubscription,
    MessageAddedSubscriptionVariables
  >(MessageAddedDocument, baseOptions);
}
export type MessageAddedSubscriptionHookResult = ReturnType<
  typeof useMessageAddedSubscription
>;
export type MessageAddedSubscriptionResult = Apollo.SubscriptionResult<MessageAddedSubscription>;
