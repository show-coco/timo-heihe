import { Field, InputType } from '@nestjs/graphql';
import { ConnectTeamInput } from 'src/teams/dto/connect-room.input';

@InputType()
export class CreateRoomInput {
  @Field()
  name: string;

  @Field(() => ConnectTeamInput)
  team: ConnectTeamInput;
}
