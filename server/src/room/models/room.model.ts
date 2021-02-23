import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { TeamMemberModel } from '../../team-members-user/models/team-member.model';
import { CategoryModel } from '../../category/models/category.model';
import { SkillModel } from '../../skill/models/skill.model';
import { UserModel } from '../../users/models/user.model';
import { ChannelModel } from '../../channel/models/channel.model';
import { TeamTypeModel } from '../../team-type/models/team-type.model';

@ObjectType()
export class RoomModel {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  title: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  icon?: string;

  @Field()
  description: string;

  @Field(() => [SkillModel], { nullable: true })
  skills?: SkillModel[];

  @Field(() => UserModel)
  owner: UserModel;

  @Field(() => [TeamMemberModel], { nullable: true })
  members?: TeamMemberModel[];

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

  @Field(() => [TeamTypeModel])
  types: TeamTypeModel[];
}
