import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ConnectChannelInput {
  @Field(() => Int)
  id: number;
}
