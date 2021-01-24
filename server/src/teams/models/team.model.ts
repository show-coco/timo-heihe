import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { CategoryModel } from 'src/category/models/category.model';
import { SkillModel } from 'src/skill/models/skill.model';
import { UserModel } from 'src/users/models/user.model';

@ObjectType()
export class TeamModel {
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

  @Field(() => [UserModel], { nullable: true })
  members?: UserModel[];

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
}
