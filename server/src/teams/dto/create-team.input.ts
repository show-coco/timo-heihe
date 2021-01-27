import { InputType, Field, GraphQLTimestamp, Int } from '@nestjs/graphql';
import { CategoryInput } from '../../category/dto/category.input';
import { SkillInput } from '../../skill/dto/skill.input';
import { UserInput } from '../../users/dto/user.input';

@InputType()
export class CreateTeamInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  icon?: string;

  @Field()
  description: string;

  @Field(() => [SkillInput])
  skills?: SkillInput[];

  @Field()
  owner: UserInput;

  @Field(() => [UserInput])
  members: UserInput[];

  @Field(() => [CategoryInput])
  categories: CategoryInput[];

  @Field({ nullable: true })
  repositoryUrl?: string;

  @Field(() => Int)
  recruitNumbers: number;

  @Field()
  isRequired: boolean;

  @Field(() => GraphQLTimestamp, { nullable: true })
  createdAt: Date;
}
