import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateThreadInput {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;
}
