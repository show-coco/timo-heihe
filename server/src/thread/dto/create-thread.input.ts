import { InputType, Field } from '@nestjs/graphql';
import { ConnectChannelInput } from '../../channel/dto/connect-channel.input';
import { ConnectUserInput } from '../../users/dto/connect-user.input';

@InputType()
export class CreateThreadInput {
  @Field()
  text: string;

  @Field(() => ConnectChannelInput)
  channel: ConnectChannelInput;

  @Field(() => ConnectUserInput)
  user: ConnectUserInput;
}
