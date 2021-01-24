import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SkillModel } from 'src/skill/models/skill.model';
import { TeamModel } from 'src/teams/models/team.model';

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

  @Field(() => [TeamModel])
  teams: TeamModel[];

  @Field(() => [SkillModel])
  skills: SkillModel[];
}
