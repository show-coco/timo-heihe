import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { UserInput } from './user.input';

@InputType()
export class UpdateUserInput extends PartialType(UserInput) {
  @Field(() => ID)
  id: string;
}
