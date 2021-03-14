import { InputType, Field, Int } from '@nestjs/graphql';
import { ConnectThreadInput } from '../../thread/dto/connect-thread.input';

@InputType()
export class CreateMessageInput {
  @Field()
  text: string;

  @Field(() => ConnectThreadInput)
  thread: ConnectThreadInput;

  @Field(() => Int)
  userId: number;
}
