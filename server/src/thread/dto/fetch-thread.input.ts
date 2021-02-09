import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FetchThreadInput {
  @Field(() => Int)
  roomId: number;

  @Field()
  cursor: string;
}
