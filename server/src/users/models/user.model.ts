import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserMemberModel } from '../../team-members-user/models/user-member-model';
import { SkillModel } from '../../skill/models/skill.model';
import { TeamModel } from '../../teams/models/team.model';
import { RoomModel } from 'src/room/models/room.model';

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field()
  userId: string;

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

  @Field(() => [TeamModel], { nullable: true })
  ownerTeams: TeamModel[];

  @Field(() => [UserMemberModel], { nullable: true })
  teams: UserMemberModel[];

  @Field(() => [SkillModel], { nullable: true })
  skills: SkillModel[];

  @Field(() => [RoomModel], { nullable: true })
  rooms: RoomModel[];
}
