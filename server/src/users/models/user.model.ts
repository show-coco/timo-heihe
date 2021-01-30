import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserMemberModel } from 'src/team-members-user/models/user-member-model';
import { SkillModel } from '../../skill/models/skill.model';
import { TeamModel } from '../../teams/models/team.model';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  introduction: string;

  @Field({ nullable: true })
  githubId: string;

  @Field({ nullable: true })
  twitterId: string;

  @Field(() => [TeamModel])
  ownerTeams: TeamModel[];

  @Field(() => [UserMemberModel])
  teams: UserMemberModel[];

  @Field(() => [SkillModel])
  skills: SkillModel[];
}
