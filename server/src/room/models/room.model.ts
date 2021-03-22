import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { CategoryModel } from '../../category/models/category.model';
import { SkillModel } from '../../skill/models/skill.model';
import { UserModel } from '../../users/models/user.model';
import { RoomTypeModel } from '../../room-type/models/room-type.model';
import { RecruitmentLevelModel } from '../../recruitment-level/models/recruitment-level.model';

@ObjectType()
export class RoomModel {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  icon?: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  invidationUrl?: string;

  @Field(() => [SkillModel], { nullable: true })
  skills?: SkillModel[];

  @Field(() => UserModel)
  owner: UserModel;

  @Field(() => [CategoryModel])
  categories: CategoryModel[];

  @Field({ nullable: true })
  repositoryUrl?: string;

  @Field()
  withApplication: boolean;

  @Field(() => [RoomTypeModel])
  types: RoomTypeModel[];

  @Field(() => [RecruitmentLevelModel])
  recruitmentLevels: RecruitmentLevelModel[];

  @Field(() => [UserModel], { nullable: true })
  applyingUsers?: UserModel[];

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;
}
