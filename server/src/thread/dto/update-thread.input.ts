import { CreateThreadInput } from './create-thread.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateThreadInput extends PartialType(CreateThreadInput) {
  @Field(() => Int)
  id: number;
}
