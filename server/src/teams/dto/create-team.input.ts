import { InputType, Field, GraphQLTimestamp } from '@nestjs/graphql';
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

  @Field(() => GraphQLTimestamp, { nullable: true })
  createdAt: Date;
}
