import { InputType, Field } from '@nestjs/graphql';
import { ConnectRoomInput } from 'src/room/dto/connect-room.input';
import { ConnectUserInput } from 'src/users/dto/connect-user.input';

@InputType()
export class CreateThreadInput {
  @Field()
  text: string;

  @Field(() => ConnectRoomInput)
  room: ConnectRoomInput;

  @Field(() => ConnectUserInput)
  user: ConnectUserInput;
}
