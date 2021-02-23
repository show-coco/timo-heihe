import { Field, InputType } from '@nestjs/graphql';
import { ConnectTeamInput } from '../../teams/dto/connect-room.input';

@InputType()
export class CreateChannelInput {
  @Field()
  name: string;

  @Field(() => ConnectTeamInput)
  team: ConnectTeamInput;
}
