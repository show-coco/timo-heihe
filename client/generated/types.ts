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
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
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

export type CreateCategoryInput = {
  name: Scalars['String'];
};

export type CreateSkillInput = {
  icon: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type CreateTeamInput = {
  categories: Array<CategoryInput>;
  createdAt?: Maybe<Scalars['Timestamp']>;
  description: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  isRequired: Scalars['Boolean'];
  members: Array<UserInput>;
  owner: UserInput;
  recruitNumbers: Scalars['Int'];
  repositoryUrl?: Maybe<Scalars['String']>;
  skills: Array<SkillInput>;
  title: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  createCategory: CategoryModel;
  createSkill: SkillModel;
  createTeam: TeamModel;
  deleteTeam: TeamModel;
  removeCategory: CategoryModel;
  removeSkill: SkillModel;
  updateCategory: CategoryModel;
  updateSkill: SkillModel;
  updateTeam: TeamModel;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateSkillArgs = {
  createSkillInput: CreateSkillInput;
};


export type MutationCreateTeamArgs = {
  createTeamInput: CreateTeamInput;
};


export type MutationDeleteTeamArgs = {
  id: Scalars['Float'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveSkillArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateSkillArgs = {
  updateSkillInput: UpdateSkillInput;
};


export type MutationUpdateTeamArgs = {
  updateTeamInput: UpdateTeamInput;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<CategoryModel>;
  category: CategoryModel;
  me: UserModel;
  skill: SkillModel;
  skills: Array<SkillModel>;
  team: TeamModel;
  teams: Array<TeamModel>;
  user: UserModel;
  users: Array<UserModel>;
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};


export type QuerySkillArgs = {
  id: Scalars['Int'];
};


export type QueryTeamArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
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

export type TeamModel = {
  __typename?: 'TeamModel';
  categories: Array<CategoryModel>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  isRequired: Scalars['Boolean'];
  members?: Maybe<Array<UserModel>>;
  owner: UserModel;
  recruitNumbers: Scalars['Int'];
  repositoryUrl?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<SkillModel>>;
  title: Scalars['String'];
};


export type UpdateCategoryInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateSkillInput = {
  icon?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateTeamInput = {
  categories?: Maybe<Array<CategoryInput>>;
  createdAt?: Maybe<Scalars['Timestamp']>;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isRequired?: Maybe<Scalars['Boolean']>;
  members?: Maybe<Array<UserInput>>;
  owner?: Maybe<UserInput>;
  recruitNumbers?: Maybe<Scalars['Int']>;
  repositoryUrl?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<SkillInput>>;
  title?: Maybe<Scalars['String']>;
};

export type UserInput = {
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  githubId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  introduction?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
};

export type UserModel = {
  __typename?: 'UserModel';
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  githubId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  introduction?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  twitterId?: Maybe<Scalars['String']>;
};

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
      { __typename?: 'UserModel' }
      & Pick<UserModel, 'id' | 'name' | 'avatar'>
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'name' | 'id'>
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
      { __typename?: 'UserModel' }
      & Pick<UserModel, 'id' | 'name' | 'avatar'>
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
      & Pick<UserModel, 'id' | 'name' | 'avatar'>
    ), members?: Maybe<Array<(
      { __typename?: 'UserModel' }
      & Pick<UserModel, 'id'>
    )>> }
  )> }
);


export const CreateTeamDocument = gql`
    mutation CreateTeam($input: CreateTeamInput!) {
  createTeam(createTeamInput: $input) {
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
export const MeDocument = gql`
    query Me {
  me {
    name
    id
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