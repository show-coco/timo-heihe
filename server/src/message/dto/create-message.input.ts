import { InputType, Field } from '@nestjs/graphql';
import { ConnectThreadInput } from '../../thread/dto/connect-thread.input';
import { ConnectUserInput } from '../../users/dto/connect-user.input';

@InputType()
export class CreateMessageInput {
  @Field()
  text: string;

  @Field(() => ConnectThreadInput)
  thread: ConnectThreadInput;

  @Field(() => ConnectUserInput)
  user: ConnectUserInput;
}
