import { CreateRoomMembersUserInput } from './create-room-members-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRoomMembersUserInput extends PartialType(
  CreateRoomMembersUserInput,
) {
  @Field(() => Int)
  id: number;
}
