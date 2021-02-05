import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ConnectTeamInput {
  @Field(() => Int)
  id: number;
}
