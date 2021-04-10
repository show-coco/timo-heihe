import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../users/models/user.model';

@ObjectType()
export class MessageModel {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field(() => UserModel)
  sender: UserModel;

  @Field(() => UserModel)
  receiver: UserModel;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
