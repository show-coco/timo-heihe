import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../users/models/user.model';

@ObjectType()
export class ThreadModel {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => Int)
  numberOfMessages: number;
}
