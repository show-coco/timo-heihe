import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateThreadInput {
  @Field()
  text: string;

  @Field(() => Int)
  userId: number;
}
