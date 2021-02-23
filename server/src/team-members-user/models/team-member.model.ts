import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { SkillModel } from '../../skill/models/skill.model';
import { RoomModel } from '../../room/models/room.model';
import { MemberState } from '../entities/team-members-user.entity';

registerEnumType(MemberState, {
  name: 'MemberState',
});

@ObjectType()
export class TeamMemberModel {
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

  @Field(() => [RoomModel])
  ownerTeams: RoomModel[];

  @Field(() => [RoomModel])
  teams: RoomModel[];

  @Field(() => [SkillModel])
  skills: SkillModel[];

  @Field(() => MemberState)
  memberState: MemberState;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
