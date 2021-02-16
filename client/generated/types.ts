import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type CategoryModel = {
  __typename?: 'CategoryModel';
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  teams: Array<TeamModel>;
};

export type ConnectRoomInput = {
  id: Scalars['Int'];
};

export type ConnectTeamInput = {
  id: Scalars['Int'];
};

export type ConnectThreadInput = {
  id: Scalars['Int'];
};

export type ConnectUserInput = {
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  githubId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  introduction?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<SkillInput>>;
  twitterId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type CreateCategoryInput = {
  name: Scalars['String'];
};

export type CreateMessageInput = {
  text: Scalars['String'];
  thread: ConnectThreadInput;
  user: ConnectUserInput;
};

export type CreateRoomInput = {
  name: Scalars['String'];
  team: ConnectTeamInput;
};

export type CreateSkillInput = {
  icon: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type CreateTeamInput = {
  categories: Array<CategoryInput>;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  isRequired: Scalars['Boolean'];
  members: Array<CreateTeamMembersUserInput>;
  owner: ConnectUserInput;
  recruitNumbers: Scalars['Int'];
  rectuiting?: Maybe<Scalars['Boolean']>;
  repositoryUrl?: Maybe<Scalars['String']>;
  skills: Array<SkillInput>;
  title: Scalars['String'];
};

export type CreateTeamMembersUserInput = {
  team?: Maybe<UpdateTeamInput>;
  user: ConnectUserInput;
};

export type CreateThreadInput = {
  room: ConnectRoomInput;
  text: Scalars['String'];
  user: ConnectUserInput;
};


export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  affected?: Maybe<Scalars['Int']>;
};

export type FetchThreadInput = {
  cursor: Scalars['String'];
  roomId: Scalars['Int'];
};

export enum MemberState {
  Ejected = 'EJECTED',
  Joining = 'JOINING',
  Leave = 'LEAVE',
  Pending = 'PENDING'
}

export type MessageModel = {
  __typename?: 'MessageModel';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  text: Scalars['String'];
  thread: ThreadModel;
  user: UserModel;
};

export type Mutation = {
  __typename?: 'Mutation';
  applyTeam: TeamModel;
  createCategory: CategoryModel;
  createMessage: MessageModel;
  createRoom: RoomModel;
  createSkill: SkillModel;
  createTeam: TeamModel;
  createThread: ThreadModel;
  deleteRoom: DeleteResponse;
  deleteTeam: TeamModel;
  joinTeam: TeamModel;
  leaveTeam: TeamModel;
  removeCategory: CategoryModel;
  removeMessage: DeleteResponse;
  removeSkill: SkillModel;
  removeThread: ThreadModel;
  updateCategory: CategoryModel;
  updateMessage: MessageModel;
  updateSkill: SkillModel;
  updateTeam: TeamModel;
  updateThread: ThreadModel;
  updateUser: UserModel;
};


export type MutationApplyTeamArgs = {
  teamId: Scalars['Int'];
  userId: Scalars['Int'];
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


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationCreateThreadArgs = {
  input: CreateThreadInput;
};


export type MutationDeleteRoomArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteTeamArgs = {
  id: Scalars['Int'];
};


export type MutationJoinTeamArgs = {
  teamId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationLeaveTeamArgs = {
  teamId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveMessageArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveSkillArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveThreadArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput;
};


export type MutationUpdateSkillArgs = {
  updateSkillInput: UpdateSkillInput;
};


export type MutationUpdateTeamArgs = {
  updateTeamInput: UpdateTeamInput;
};


export type MutationUpdateThreadArgs = {
  input: UpdateThreadInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<CategoryModel>;
  category: CategoryModel;
  me: UserModel;
  message: MessageModel;
  messages: Array<MessageModel>;
  room: RoomModel;
  rooms: Array<RoomModel>;
  skill: SkillModel;
  skills: Array<SkillModel>;
  team: TeamModel;
  teams: Array<TeamModel>;
  thread: ThreadModel;
  threads?: Maybe<Array<ThreadModel>>;
  user: UserModel;
  users: Array<UserModel>;
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryMessageArgs = {
  id: Scalars['Int'];
};


export type QueryRoomArgs = {
  id: Scalars['Int'];
};


export type QuerySkillArgs = {
  id: Scalars['Int'];
};


export type QueryTeamArgs = {
  id: Scalars['Int'];
};


export type QueryTeamsArgs = {
  input?: Maybe<SearchTeamInput>;
};


export type QueryThreadArgs = {
  id: Scalars['Int'];
};


export type QueryThreadsArgs = {
  input: FetchThreadInput;
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};

export type RoomModel = {
  __typename?: 'RoomModel';
  id: Scalars['Int'];
  name: Scalars['String'];
  team: TeamModel;
  threads: Array<ThreadModel>;
  user: UserModel;
};

export type SearchTeamInput = {
  categoryIds?: Maybe<Array<Scalars['Int']>>;
  name?: Maybe<Scalars['String']>;
  recruitNumbers?: Maybe<Scalars['Int']>;
  skillIds?: Maybe<Array<Scalars['Int']>>;
};

export type SkillInput = {
  icon?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type SkillModel = {
  __typename?: 'SkillModel';
  icon: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded: MessageModel;
  threadAdded: ThreadModel;
};


export type SubscriptionMessageAddedArgs = {
  roomId: Scalars['Int'];
};


export type SubscriptionThreadAddedArgs = {
  roomId: Scalars['Int'];
};

export type TeamMemberModel = {
  __typename?: 'TeamMemberModel';
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  githubId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  introduction?: Maybe<Scalars['String']>;
  memberState: MemberState;
  name: Scalars['String'];
  ownerTeams: Array<TeamModel>;
  skills: Array<SkillModel>;
  teams: Array<TeamModel>;
  twitterId?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type TeamModel = {
  __typename?: 'TeamModel';
  categories: Array<CategoryModel>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  isRequired: Scalars['Boolean'];
  members?: Maybe<Array<TeamMemberModel>>;
  owner: UserModel;
  recruitNumbers: Scalars['Int'];
  repositoryUrl?: Maybe<Scalars['String']>;
  rooms?: Maybe<Array<RoomModel>>;
  skills?: Maybe<Array<SkillModel>>;
  title: Scalars['String'];
};

export type ThreadModel = {
  __typename?: 'ThreadModel';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  numberOfMessages: Scalars['Int'];
  room: RoomModel;
  text: Scalars['String'];
  user: UserModel;
};

export type UpdateCategoryInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateMessageInput = {
  id: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  thread?: Maybe<ConnectThreadInput>;
  user?: Maybe<ConnectUserInput>;
};

export type UpdateSkillInput = {
  icon?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateTeamInput = {
  categories?: Maybe<Array<CategoryInput>>;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isRequired?: Maybe<Scalars['Boolean']>;
  members?: Maybe<Array<CreateTeamMembersUserInput>>;
  owner?: Maybe<ConnectUserInput>;
  recruitNumbers?: Maybe<Scalars['Int']>;
  rectuiting?: Maybe<Scalars['Boolean']>;
  repositoryUrl?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<SkillInput>>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateThreadInput = {
  id: Scalars['Int'];
  text: Scalars['String'];
};

export type UpdateUserInput = {
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  githubId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  introduction?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<SkillInput>>;
  twitterId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type UserMemberModel = {
  __typename?: 'UserMemberModel';
  categories: Array<CategoryModel>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  isRequired: Scalars['Boolean'];
  members?: Maybe<Array<TeamMemberModel>>;
  memberState: MemberState;
  owner: UserModel;
  recruitNumbers: Scalars['Int'];
  repositoryUrl?: Maybe<Scalars['String']>;
  rooms?: Maybe<Array<RoomModel>>;
  skills?: Maybe<Array<SkillModel>>;
  title: Scalars['String'];
};

export type UserModel = {
  __typename?: 'UserModel';
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  githubId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  introduction?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  ownerTeams?: Maybe<Array<TeamModel>>;
  rooms?: Maybe<Array<RoomModel>>;
  skills?: Maybe<Array<SkillModel>>;
  teams?: Maybe<Array<UserMemberModel>>;
  twitterId?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type ChatItemFragment = (
  { __typename?: 'ThreadModel' }
  & Pick<ThreadModel, 'id' | 'text' | 'createdAt' | 'numberOfMessages'>
  & { room: (
    { __typename?: 'RoomModel' }
    & Pick<RoomModel, 'id'>
  ), user: (
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'name' | 'avatar'>
  ) }
);

export type RoomItemFragment = (
  { __typename?: 'UserMemberModel' }
  & { rooms?: Maybe<Array<(
    { __typename?: 'RoomModel' }
    & RoomFragment
  )>> }
);

export type RoomFragment = (
  { __typename?: 'RoomModel' }
  & Pick<RoomModel, 'id' | 'name'>
);

export type SpaceItemFragment = (
  { __typename?: 'UserMemberModel' }
  & Pick<UserMemberModel, 'id' | 'title' | 'icon'>
);

export type CreateRoomMutationVariables = Exact<{
  input: CreateRoomInput;
}>;


export type CreateRoomMutation = (
  { __typename?: 'Mutation' }
  & { createRoom: (
    { __typename?: 'RoomModel' }
    & RoomFragment
  ) }
);

export type CreateTeamMutationVariables = Exact<{
  input: CreateTeamInput;
}>;


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: (
    { __typename?: 'TeamModel' }
    & Pick<TeamModel, 'id' | 'title'>
  ) }
);

export type CreateThreadMutationVariables = Exact<{
  input: CreateThreadInput;
}>;


export type CreateThreadMutation = (
  { __typename?: 'Mutation' }
  & { createThread: (
    { __typename?: 'ThreadModel' }
    & ChatItemFragment
  ) }
);

export type EditTeamMutationVariables = Exact<{
  input: UpdateTeamInput;
}>;


export type EditTeamMutation = (
  { __typename?: 'Mutation' }
  & { updateTeam: (
    { __typename?: 'TeamModel' }
    & Pick<TeamModel, 'id' | 'title'>
  ) }
);

export type EditThreadMutationVariables = Exact<{
  input: UpdateThreadInput;
}>;


export type EditThreadMutation = (
  { __typename?: 'Mutation' }
  & { updateThread: (
    { __typename?: 'ThreadModel' }
    & Pick<ThreadModel, 'id' | 'text'>
  ) }
);

export type JoinTeamMutationVariables = Exact<{
  teamId: Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type JoinTeamMutation = (
  { __typename?: 'Mutation' }
  & { joinTeam: (
    { __typename?: 'TeamModel' }
    & Pick<TeamModel, 'id' | 'title'>
    & { members?: Maybe<Array<(
      { __typename?: 'TeamMemberModel' }
      & Pick<TeamMemberModel, 'id' | 'name'>
    )>> }
  ) }
);

export type LeaveTeamMutationVariables = Exact<{
  teamId: Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type LeaveTeamMutation = (
  { __typename?: 'Mutation' }
  & { leaveTeam: (
    { __typename?: 'TeamModel' }
    & Pick<TeamModel, 'id' | 'title'>
    & { members?: Maybe<Array<(
      { __typename?: 'TeamMemberModel' }
      & Pick<TeamMemberModel, 'id' | 'name'>
    )>> }
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'userId'>
  ) }
);

export type ApplyTeamMutationVariables = Exact<{
  teamId: Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type ApplyTeamMutation = (
  { __typename?: 'Mutation' }
  & { applyTeam: (
    { __typename?: 'TeamModel' }
    & Pick<TeamModel, 'id' | 'title'>
  ) }
);

export type ChatPageQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type ChatPageQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'UserModel' }
    & { teams?: Maybe<Array<(
      { __typename?: 'UserMemberModel' }
      & SpaceItemFragment
      & RoomItemFragment
    )>> }
  ) }
);

export type CreateTeamPageQueryVariables = Exact<{ [key: string]: never; }>;


export type CreateTeamPageQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'CategoryModel' }
    & Pick<CategoryModel, 'id' | 'name'>
  )>, skills: Array<(
    { __typename?: 'SkillModel' }
    & Pick<SkillModel, 'id' | 'name' | 'icon'>
  )> }
);

export type TeamEditPageQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TeamEditPageQuery = (
  { __typename?: 'Query' }
  & { team: (
    { __typename?: 'TeamModel' }
    & Pick<TeamModel, 'id' | 'title' | 'description' | 'icon' | 'recruitNumbers' | 'isRequired' | 'repositoryUrl'>
    & { members?: Maybe<Array<(
      { __typename?: 'TeamMemberModel' }
      & Pick<TeamMemberModel, 'id' | 'name' | 'avatar'>
    )>>, owner: (
      { __typename?: 'UserModel' }
      & Pick<UserModel, 'id' | 'name' | 'avatar'>
    ), skills?: Maybe<Array<(
      { __typename?: 'SkillModel' }
      & Pick<SkillModel, 'id' | 'name'>
    )>>, categories: Array<(
      { __typename?: 'CategoryModel' }
      & Pick<CategoryModel, 'id' | 'name'>
    )> }
  ), categories: Array<(
    { __typename?: 'CategoryModel' }
    & Pick<CategoryModel, 'id' | 'name'>
  )>, skills: Array<(
    { __typename?: 'SkillModel' }
    & Pick<SkillModel, 'id' | 'name'>
  )> }
);

export type EditUserPageQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type EditUserPageQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'userId' | 'name' | 'avatar' | 'introduction' | 'githubId' | 'twitterId'>
    & { skills?: Maybe<Array<(
      { __typename?: 'SkillModel' }
      & Pick<SkillModel, 'id' | 'name'>
    )>>, teams?: Maybe<Array<(
      { __typename?: 'UserMemberModel' }
      & Pick<UserMemberModel, 'id' | 'title' | 'description' | 'createdAt' | 'recruitNumbers'>
      & { skills?: Maybe<Array<(
        { __typename?: 'SkillModel' }
        & Pick<SkillModel, 'id' | 'name'>
      )>>, owner: (
        { __typename?: 'UserModel' }
        & Pick<UserModel, 'id' | 'name' | 'avatar' | 'userId'>
      ), members?: Maybe<Array<(
        { __typename?: 'TeamMemberModel' }
        & Pick<TeamMemberModel, 'id' | 'userId'>
      )>> }
    )>> }
  ), skills: Array<(
    { __typename?: 'SkillModel' }
    & Pick<SkillModel, 'id' | 'name'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'userId' | 'name'>
  ) }
);

export type TeamQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TeamQuery = (
  { __typename?: 'Query' }
  & { team: (
    { __typename?: 'TeamModel' }
    & Pick<TeamModel, 'id' | 'title' | 'description' | 'icon' | 'recruitNumbers' | 'isRequired' | 'repositoryUrl'>
    & { members?: Maybe<Array<(
      { __typename?: 'TeamMemberModel' }
      & Pick<TeamMemberModel, 'id' | 'userId' | 'name' | 'avatar' | 'memberState'>
    )>>, owner: (
      { __typename?: 'UserModel' }
      & Pick<UserModel, 'id' | 'userId' | 'name' | 'avatar'>
    ), skills?: Maybe<Array<(
      { __typename?: 'SkillModel' }
      & Pick<SkillModel, 'id' | 'name'>
    )>>, categories: Array<(
      { __typename?: 'CategoryModel' }
      & Pick<CategoryModel, 'id' | 'name'>
    )> }
  ) }
);

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = (
  { __typename?: 'Query' }
  & { teams: Array<(
    { __typename?: 'TeamModel' }
    & Pick<TeamModel, 'id' | 'title' | 'description' | 'createdAt' | 'recruitNumbers'>
    & { skills?: Maybe<Array<(
      { __typename?: 'SkillModel' }
      & Pick<SkillModel, 'id' | 'name'>
    )>>, owner: (
      { __typename?: 'UserModel' }
      & Pick<UserModel, 'id' | 'userId' | 'name' | 'avatar'>
    ), members?: Maybe<Array<(
      { __typename?: 'TeamMemberModel' }
      & Pick<TeamMemberModel, 'id'>
    )>> }
  )> }
);

export type ThreadListQueryVariables = Exact<{
  input: FetchThreadInput;
}>;


export type ThreadListQuery = (
  { __typename?: 'Query' }
  & { threads?: Maybe<Array<(
    { __typename?: 'ThreadModel' }
    & ChatItemFragment
  )>> }
);

export type UserDetailPageQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserDetailPageQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'userId' | 'name' | 'avatar' | 'introduction' | 'githubId' | 'twitterId'>
    & { skills?: Maybe<Array<(
      { __typename?: 'SkillModel' }
      & Pick<SkillModel, 'id' | 'name'>
    )>>, teams?: Maybe<Array<(
      { __typename?: 'UserMemberModel' }
      & Pick<UserMemberModel, 'id' | 'title' | 'description' | 'createdAt' | 'recruitNumbers'>
      & { skills?: Maybe<Array<(
        { __typename?: 'SkillModel' }
        & Pick<SkillModel, 'id' | 'name'>
      )>>, owner: (
        { __typename?: 'UserModel' }
        & Pick<UserModel, 'id' | 'name' | 'avatar' | 'userId'>
      ), members?: Maybe<Array<(
        { __typename?: 'TeamMemberModel' }
        & Pick<TeamMemberModel, 'id' | 'userId'>
      )>> }
    )>> }
  ) }
);

export type ThreadSubscriptionVariables = Exact<{
  roomId: Scalars['Int'];
}>;


export type ThreadSubscription = (
  { __typename?: 'Subscription' }
  & { threadAdded: (
    { __typename?: 'ThreadModel' }
    & Pick<ThreadModel, 'id' | 'text' | 'createdAt' | 'numberOfMessages'>
    & { room: (
      { __typename?: 'RoomModel' }
      & Pick<RoomModel, 'id'>
    ), user: (
      { __typename?: 'UserModel' }
      & Pick<UserModel, 'id' | 'name' | 'avatar'>
    ) }
  ) }
);

export const ChatItemFragmentDoc = gql`
    fragment ChatItem on ThreadModel {
  id
  text
  room {
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
export const RoomFragmentDoc = gql`
    fragment Room on RoomModel {
  id
  name
}
    `;
export const RoomItemFragmentDoc = gql`
    fragment RoomItem on UserMemberModel {
  rooms {
    ...Room
  }
}
    ${RoomFragmentDoc}`;
export const SpaceItemFragmentDoc = gql`
    fragment SpaceItem on UserMemberModel {
  id
  title
  icon
}
    `;
export const CreateRoomDocument = gql`
    mutation CreateRoom($input: CreateRoomInput!) {
  createRoom(input: $input) {
    ...Room
  }
}
    ${RoomFragmentDoc}`;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

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
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, baseOptions);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($input: CreateTeamInput!) {
  createTeam(input: $input) {
    id
    title
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, baseOptions);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const CreateThreadDocument = gql`
    mutation CreateThread($input: CreateThreadInput!) {
  createThread(input: $input) {
    ...ChatItem
  }
}
    ${ChatItemFragmentDoc}`;
export type CreateThreadMutationFn = Apollo.MutationFunction<CreateThreadMutation, CreateThreadMutationVariables>;

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
export function useCreateThreadMutation(baseOptions?: Apollo.MutationHookOptions<CreateThreadMutation, CreateThreadMutationVariables>) {
        return Apollo.useMutation<CreateThreadMutation, CreateThreadMutationVariables>(CreateThreadDocument, baseOptions);
      }
export type CreateThreadMutationHookResult = ReturnType<typeof useCreateThreadMutation>;
export type CreateThreadMutationResult = Apollo.MutationResult<CreateThreadMutation>;
export type CreateThreadMutationOptions = Apollo.BaseMutationOptions<CreateThreadMutation, CreateThreadMutationVariables>;
export const EditTeamDocument = gql`
    mutation EditTeam($input: UpdateTeamInput!) {
  updateTeam(updateTeamInput: $input) {
    id
    title
  }
}
    `;
export type EditTeamMutationFn = Apollo.MutationFunction<EditTeamMutation, EditTeamMutationVariables>;

/**
 * __useEditTeamMutation__
 *
 * To run a mutation, you first call `useEditTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTeamMutation, { data, loading, error }] = useEditTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditTeamMutation(baseOptions?: Apollo.MutationHookOptions<EditTeamMutation, EditTeamMutationVariables>) {
        return Apollo.useMutation<EditTeamMutation, EditTeamMutationVariables>(EditTeamDocument, baseOptions);
      }
export type EditTeamMutationHookResult = ReturnType<typeof useEditTeamMutation>;
export type EditTeamMutationResult = Apollo.MutationResult<EditTeamMutation>;
export type EditTeamMutationOptions = Apollo.BaseMutationOptions<EditTeamMutation, EditTeamMutationVariables>;
export const EditThreadDocument = gql`
    mutation EditThread($input: UpdateThreadInput!) {
  updateThread(input: $input) {
    id
    text
  }
}
    `;
export type EditThreadMutationFn = Apollo.MutationFunction<EditThreadMutation, EditThreadMutationVariables>;

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
export function useEditThreadMutation(baseOptions?: Apollo.MutationHookOptions<EditThreadMutation, EditThreadMutationVariables>) {
        return Apollo.useMutation<EditThreadMutation, EditThreadMutationVariables>(EditThreadDocument, baseOptions);
      }
export type EditThreadMutationHookResult = ReturnType<typeof useEditThreadMutation>;
export type EditThreadMutationResult = Apollo.MutationResult<EditThreadMutation>;
export type EditThreadMutationOptions = Apollo.BaseMutationOptions<EditThreadMutation, EditThreadMutationVariables>;
export const JoinTeamDocument = gql`
    mutation JoinTeam($teamId: Int!, $userId: Int!) {
  joinTeam(userId: $userId, teamId: $teamId) {
    id
    title
    members {
      id
      name
    }
  }
}
    `;
export type JoinTeamMutationFn = Apollo.MutationFunction<JoinTeamMutation, JoinTeamMutationVariables>;

/**
 * __useJoinTeamMutation__
 *
 * To run a mutation, you first call `useJoinTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinTeamMutation, { data, loading, error }] = useJoinTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useJoinTeamMutation(baseOptions?: Apollo.MutationHookOptions<JoinTeamMutation, JoinTeamMutationVariables>) {
        return Apollo.useMutation<JoinTeamMutation, JoinTeamMutationVariables>(JoinTeamDocument, baseOptions);
      }
export type JoinTeamMutationHookResult = ReturnType<typeof useJoinTeamMutation>;
export type JoinTeamMutationResult = Apollo.MutationResult<JoinTeamMutation>;
export type JoinTeamMutationOptions = Apollo.BaseMutationOptions<JoinTeamMutation, JoinTeamMutationVariables>;
export const LeaveTeamDocument = gql`
    mutation LeaveTeam($teamId: Int!, $userId: Int!) {
  leaveTeam(userId: $userId, teamId: $teamId) {
    id
    title
    members {
      id
      name
    }
  }
}
    `;
export type LeaveTeamMutationFn = Apollo.MutationFunction<LeaveTeamMutation, LeaveTeamMutationVariables>;

/**
 * __useLeaveTeamMutation__
 *
 * To run a mutation, you first call `useLeaveTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveTeamMutation, { data, loading, error }] = useLeaveTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useLeaveTeamMutation(baseOptions?: Apollo.MutationHookOptions<LeaveTeamMutation, LeaveTeamMutationVariables>) {
        return Apollo.useMutation<LeaveTeamMutation, LeaveTeamMutationVariables>(LeaveTeamDocument, baseOptions);
      }
export type LeaveTeamMutationHookResult = ReturnType<typeof useLeaveTeamMutation>;
export type LeaveTeamMutationResult = Apollo.MutationResult<LeaveTeamMutation>;
export type LeaveTeamMutationOptions = Apollo.BaseMutationOptions<LeaveTeamMutation, LeaveTeamMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(updateUserInput: $input) {
    id
    userId
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

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
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const ApplyTeamDocument = gql`
    mutation ApplyTeam($teamId: Int!, $userId: Int!) {
  applyTeam(teamId: $teamId, userId: $userId) {
    id
    title
  }
}
    `;
export type ApplyTeamMutationFn = Apollo.MutationFunction<ApplyTeamMutation, ApplyTeamMutationVariables>;

/**
 * __useApplyTeamMutation__
 *
 * To run a mutation, you first call `useApplyTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyTeamMutation, { data, loading, error }] = useApplyTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useApplyTeamMutation(baseOptions?: Apollo.MutationHookOptions<ApplyTeamMutation, ApplyTeamMutationVariables>) {
        return Apollo.useMutation<ApplyTeamMutation, ApplyTeamMutationVariables>(ApplyTeamDocument, baseOptions);
      }
export type ApplyTeamMutationHookResult = ReturnType<typeof useApplyTeamMutation>;
export type ApplyTeamMutationResult = Apollo.MutationResult<ApplyTeamMutation>;
export type ApplyTeamMutationOptions = Apollo.BaseMutationOptions<ApplyTeamMutation, ApplyTeamMutationVariables>;
export const ChatPageDocument = gql`
    query ChatPage($userId: String!) {
  user(userId: $userId) {
    teams {
      ...SpaceItem
      ...RoomItem
    }
  }
}
    ${SpaceItemFragmentDoc}
${RoomItemFragmentDoc}`;

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
export function useChatPageQuery(baseOptions: Apollo.QueryHookOptions<ChatPageQuery, ChatPageQueryVariables>) {
        return Apollo.useQuery<ChatPageQuery, ChatPageQueryVariables>(ChatPageDocument, baseOptions);
      }
export function useChatPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatPageQuery, ChatPageQueryVariables>) {
          return Apollo.useLazyQuery<ChatPageQuery, ChatPageQueryVariables>(ChatPageDocument, baseOptions);
        }
export type ChatPageQueryHookResult = ReturnType<typeof useChatPageQuery>;
export type ChatPageLazyQueryHookResult = ReturnType<typeof useChatPageLazyQuery>;
export type ChatPageQueryResult = Apollo.QueryResult<ChatPageQuery, ChatPageQueryVariables>;
export const CreateTeamPageDocument = gql`
    query CreateTeamPage {
  categories {
    id
    name
  }
  skills {
    id
    name
    icon
  }
}
    `;

/**
 * __useCreateTeamPageQuery__
 *
 * To run a query within a React component, call `useCreateTeamPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreateTeamPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useCreateTeamPageQuery(baseOptions?: Apollo.QueryHookOptions<CreateTeamPageQuery, CreateTeamPageQueryVariables>) {
        return Apollo.useQuery<CreateTeamPageQuery, CreateTeamPageQueryVariables>(CreateTeamPageDocument, baseOptions);
      }
export function useCreateTeamPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CreateTeamPageQuery, CreateTeamPageQueryVariables>) {
          return Apollo.useLazyQuery<CreateTeamPageQuery, CreateTeamPageQueryVariables>(CreateTeamPageDocument, baseOptions);
        }
export type CreateTeamPageQueryHookResult = ReturnType<typeof useCreateTeamPageQuery>;
export type CreateTeamPageLazyQueryHookResult = ReturnType<typeof useCreateTeamPageLazyQuery>;
export type CreateTeamPageQueryResult = Apollo.QueryResult<CreateTeamPageQuery, CreateTeamPageQueryVariables>;
export const TeamEditPageDocument = gql`
    query TeamEditPage($id: Int!) {
  team(id: $id) {
    id
    title
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
  }
  categories {
    id
    name
  }
  skills {
    id
    name
  }
}
    `;

/**
 * __useTeamEditPageQuery__
 *
 * To run a query within a React component, call `useTeamEditPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamEditPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamEditPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamEditPageQuery(baseOptions: Apollo.QueryHookOptions<TeamEditPageQuery, TeamEditPageQueryVariables>) {
        return Apollo.useQuery<TeamEditPageQuery, TeamEditPageQueryVariables>(TeamEditPageDocument, baseOptions);
      }
export function useTeamEditPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamEditPageQuery, TeamEditPageQueryVariables>) {
          return Apollo.useLazyQuery<TeamEditPageQuery, TeamEditPageQueryVariables>(TeamEditPageDocument, baseOptions);
        }
export type TeamEditPageQueryHookResult = ReturnType<typeof useTeamEditPageQuery>;
export type TeamEditPageLazyQueryHookResult = ReturnType<typeof useTeamEditPageLazyQuery>;
export type TeamEditPageQueryResult = Apollo.QueryResult<TeamEditPageQuery, TeamEditPageQueryVariables>;
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
    teams {
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
export function useEditUserPageQuery(baseOptions: Apollo.QueryHookOptions<EditUserPageQuery, EditUserPageQueryVariables>) {
        return Apollo.useQuery<EditUserPageQuery, EditUserPageQueryVariables>(EditUserPageDocument, baseOptions);
      }
export function useEditUserPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditUserPageQuery, EditUserPageQueryVariables>) {
          return Apollo.useLazyQuery<EditUserPageQuery, EditUserPageQueryVariables>(EditUserPageDocument, baseOptions);
        }
export type EditUserPageQueryHookResult = ReturnType<typeof useEditUserPageQuery>;
export type EditUserPageLazyQueryHookResult = ReturnType<typeof useEditUserPageLazyQuery>;
export type EditUserPageQueryResult = Apollo.QueryResult<EditUserPageQuery, EditUserPageQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    userId
    name
  }
}
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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const TeamDocument = gql`
    query Team($id: Int!) {
  team(id: $id) {
    id
    title
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
 * __useTeamQuery__
 *
 * To run a query within a React component, call `useTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamQuery(baseOptions: Apollo.QueryHookOptions<TeamQuery, TeamQueryVariables>) {
        return Apollo.useQuery<TeamQuery, TeamQueryVariables>(TeamDocument, baseOptions);
      }
export function useTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamQuery, TeamQueryVariables>) {
          return Apollo.useLazyQuery<TeamQuery, TeamQueryVariables>(TeamDocument, baseOptions);
        }
export type TeamQueryHookResult = ReturnType<typeof useTeamQuery>;
export type TeamLazyQueryHookResult = ReturnType<typeof useTeamLazyQuery>;
export type TeamQueryResult = Apollo.QueryResult<TeamQuery, TeamQueryVariables>;
export const TeamsDocument = gql`
    query Teams {
  teams {
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
      userId
      name
      avatar
    }
    members {
      id
    }
  }
}
    `;

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamsQuery(baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
        return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, baseOptions);
      }
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, baseOptions);
        }
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;
export const ThreadListDocument = gql`
    query ThreadList($input: FetchThreadInput!) {
  threads(input: $input) {
    ...ChatItem
  }
}
    ${ChatItemFragmentDoc}`;

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
export function useThreadListQuery(baseOptions: Apollo.QueryHookOptions<ThreadListQuery, ThreadListQueryVariables>) {
        return Apollo.useQuery<ThreadListQuery, ThreadListQueryVariables>(ThreadListDocument, baseOptions);
      }
export function useThreadListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ThreadListQuery, ThreadListQueryVariables>) {
          return Apollo.useLazyQuery<ThreadListQuery, ThreadListQueryVariables>(ThreadListDocument, baseOptions);
        }
export type ThreadListQueryHookResult = ReturnType<typeof useThreadListQuery>;
export type ThreadListLazyQueryHookResult = ReturnType<typeof useThreadListLazyQuery>;
export type ThreadListQueryResult = Apollo.QueryResult<ThreadListQuery, ThreadListQueryVariables>;
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
    teams {
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
export function useUserDetailPageQuery(baseOptions: Apollo.QueryHookOptions<UserDetailPageQuery, UserDetailPageQueryVariables>) {
        return Apollo.useQuery<UserDetailPageQuery, UserDetailPageQueryVariables>(UserDetailPageDocument, baseOptions);
      }
export function useUserDetailPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserDetailPageQuery, UserDetailPageQueryVariables>) {
          return Apollo.useLazyQuery<UserDetailPageQuery, UserDetailPageQueryVariables>(UserDetailPageDocument, baseOptions);
        }
export type UserDetailPageQueryHookResult = ReturnType<typeof useUserDetailPageQuery>;
export type UserDetailPageLazyQueryHookResult = ReturnType<typeof useUserDetailPageLazyQuery>;
export type UserDetailPageQueryResult = Apollo.QueryResult<UserDetailPageQuery, UserDetailPageQueryVariables>;
export const ThreadDocument = gql`
    subscription Thread($roomId: Int!) {
  threadAdded(roomId: $roomId) {
    id
    text
    room {
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
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useThreadSubscription(baseOptions: Apollo.SubscriptionHookOptions<ThreadSubscription, ThreadSubscriptionVariables>) {
        return Apollo.useSubscription<ThreadSubscription, ThreadSubscriptionVariables>(ThreadDocument, baseOptions);
      }
export type ThreadSubscriptionHookResult = ReturnType<typeof useThreadSubscription>;
export type ThreadSubscriptionResult = Apollo.SubscriptionResult<ThreadSubscription>;