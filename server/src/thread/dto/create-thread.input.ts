import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateThreadInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
