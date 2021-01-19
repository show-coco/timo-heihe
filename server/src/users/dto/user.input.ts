import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  introduction: string;

  @Field({ nullable: true })
  github_id: string;

  @Field({ nullable: true })
  twitter_id: string;
}
