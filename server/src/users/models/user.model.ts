import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SkillModel } from '../../skill/models/skill.model';
import { RoomModel } from '../../room/models/room.model';

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

  @Field(() => [RoomModel], { nullable: true })
  ownerTeams: RoomModel[];

  @Field(() => [SkillModel], { nullable: true })
  skills: SkillModel[];
}
