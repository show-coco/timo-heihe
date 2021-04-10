import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';

@InputType()
export class FetchMessageInput {
  @Field()
  opponentSlug: string;

  @Field(() => GraphQLISODateTime)
  cursor: Date;
}
