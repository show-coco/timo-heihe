import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field()
  text: string;

  @Field(() => Int)
  userId: number;
}
