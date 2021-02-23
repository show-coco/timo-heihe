import { Field, InputType } from '@nestjs/graphql';
import { ConnectRoomInput } from '../../room/dto/connect-room.input';

@InputType()
export class CreateChannelInput {
  @Field()
  name: string;

  @Field(() => ConnectRoomInput)
  room: ConnectRoomInput;
}
