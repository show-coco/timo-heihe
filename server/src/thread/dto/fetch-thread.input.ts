import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FetchThreadInput {
  @Field(() => Int)
  channelId: number;

  @Field()
  cursor: string;
}
