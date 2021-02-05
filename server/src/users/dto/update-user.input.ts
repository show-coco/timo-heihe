import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { ConnectUserInput } from './connect-user.input';

@InputType()
export class UpdateUserInput extends PartialType(ConnectUserInput) {
  @Field(() => Int)
  id: number;
}
