import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ConnectThreadInput {
  @Field(() => Int)
  id: number;
}
