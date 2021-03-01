import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { RoomMemberModel } from '../../room-members-user/models/room-member.model';
import { CategoryModel } from '../../category/models/category.model';
import { SkillModel } from '../../skill/models/skill.model';
import { UserModel } from '../../users/models/user.model';
import { ChannelModel } from '../../channel/models/channel.model';
import { RoomTypeModel } from '../../room-type/models/room-type.model';

@ObjectType()
export class RoomModel {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field()
  title: string;

  @Field()
  slug: string;

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

  @Field(() => [ChannelModel], { nullable: true })
  channels: ChannelModel[];

  @Field(() => [RoomTypeModel])
  types: RoomTypeModel[];
}
