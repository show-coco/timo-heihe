import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { ChannelModel } from '../../channel/models/channel.model';
import { CategoryModel } from '../../category/models/category.model';
import { SkillModel } from '../../skill/models/skill.model';
import { UserModel } from '../../users/models/user.model';
import { MemberState } from '../entities/room-members-user.entity';
import { RoomMemberModel } from './room-member.model';

@ObjectType()
export class UserMemberModel {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  icon?: string;

  @Field()
  description: string;

  @Field(() => [SkillModel], { nullable: true })
  skills?: SkillModel[];

  @Field(() => UserModel)
  owner: UserModel;

  @Field(() => [RoomMemberModel], { nullable: true })
  members?: RoomMemberModel[];

  @Field(() => [CategoryModel])
  categories: CategoryModel[];

  @Field({ nullable: true })
  repositoryUrl?: string;

  @Field(() => Int)
  recruitNumbers?: number;

  @Field()
  isRequired: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => MemberState)
  memberState: MemberState;

  @Field(() => [ChannelModel], { nullable: true })
  rooms: ChannelModel[];
}
