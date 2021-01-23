import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CategoryInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;
}
