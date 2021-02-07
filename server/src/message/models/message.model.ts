import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { ThreadModel } from '../../thread/models/thread.model';
import { UserModel } from '../../users/models/user.model';

@ObjectType()
export class MessageModel {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => ThreadModel)
  thread: ThreadModel;

  @Field(() => UserModel)
  user: UserModel;
}
