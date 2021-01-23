import { InputType, Field, GraphQLTimestamp, Int } from '@nestjs/graphql';
import { CategoryInput } from 'src/category/dto/category.input';
import { UserInput } from 'src/users/dto/user.input';

@InputType()
export class CreateTeamInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  icon?: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  skills?: string;

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
