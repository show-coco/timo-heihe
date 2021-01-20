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
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type CreateTeamInput = {
  createdAt?: Maybe<Scalars["Timestamp"]>;
  description: Scalars["String"];
  id: Scalars["Int"];
  members: Array<UserInput>;
  ownerId: Scalars["String"];
  skills?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createTeam: TeamModel;
  deleteTeam: TeamModel;
  updateTeam: TeamModel;
};

export type MutationCreateTeamArgs = {
  createTeamInput: CreateTeamInput;
};

export type MutationDeleteTeamArgs = {
  id: Scalars["Float"];
};

export type MutationUpdateTeamArgs = {
  updateTeamInput: UpdateTeamInput;
};

export type Query = {
  __typename?: "Query";
  team: TeamModel;
  teams: Array<TeamModel>;
  user: UserModel;
  users: Array<UserModel>;
};

export type QueryTeamArgs = {
  id: Scalars["Int"];
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type TeamModel = {
  __typename?: "TeamModel";
  createdAt?: Maybe<Scalars["Timestamp"]>;
  description: Scalars["String"];
  id?: Maybe<Scalars["Int"]>;
  members?: Maybe<Array<UserModel>>;
  owner: UserModel;
  skills?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
};

export type UpdateTeamInput = {
  createdAt?: Maybe<Scalars["Timestamp"]>;
  description?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  members?: Maybe<Array<UserInput>>;
  ownerId?: Maybe<Scalars["String"]>;
  skills?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
};

export type UserInput = {
  avatar?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  githubId?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  introduction?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  twitterId?: Maybe<Scalars["String"]>;
};

export type UserModel = {
  __typename?: "UserModel";
  avatar?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  githubId?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  introduction?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  twitterId?: Maybe<Scalars["String"]>;
};

export type TeamQueryVariables = Exact<{ [key: string]: never }>;

export type TeamQuery = { __typename?: "Query" } & {
  team: { __typename?: "TeamModel" } & Pick<
    TeamModel,
    "id" | "title" | "createdAt"
  > & { owner: { __typename?: "UserModel" } & Pick<UserModel, "id" | "name"> };
};

export type TeamsQueryVariables = Exact<{ [key: string]: never }>;

export type TeamsQuery = { __typename?: "Query" } & {
  teams: Array<
    { __typename?: "TeamModel" } & Pick<
      TeamModel,
      "id" | "title" | "description" | "createdAt" | "skills"
    > & {
        owner: { __typename?: "UserModel" } & Pick<
          UserModel,
          "id" | "name" | "avatar"
        >;
        members?: Maybe<
          Array<{ __typename?: "UserModel" } & Pick<UserModel, "id">>
        >;
      }
  >;
};

export const TeamDocument = gql`
  query Team {
    team(id: 11) {
      id
      title
      createdAt
      owner {
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
 *   },
 * });
 */
export function useTeamQuery(
  baseOptions?: Apollo.QueryHookOptions<TeamQuery, TeamQueryVariables>
) {
  return Apollo.useQuery<TeamQuery, TeamQueryVariables>(
    TeamDocument,
    baseOptions
  );
}
export function useTeamLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TeamQuery, TeamQueryVariables>
) {
  return Apollo.useLazyQuery<TeamQuery, TeamQueryVariables>(
    TeamDocument,
    baseOptions
  );
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
      skills
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
export function useTeamsQuery(
  baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>
) {
  return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(
    TeamsDocument,
    baseOptions
  );
}
export function useTeamsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>
) {
  return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(
    TeamsDocument,
    baseOptions
  );
}
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<
  TeamsQuery,
  TeamsQueryVariables
>;
