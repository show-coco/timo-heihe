import { InputType, Field } from '@nestjs/graphql';
import { UpdateRoomInput } from '../../room/dto/update-room.input';
import { ConnectUserInput } from '../../users/dto/connect-user.input';

@InputType()
export class CreateTeamMembersUserInput {
  @Field(() => ConnectUserInput)
  user: ConnectUserInput;

  @Field(() => UpdateRoomInput, { nullable: true })
  team: UpdateRoomInput;
}
