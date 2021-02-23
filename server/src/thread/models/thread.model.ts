import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { ChannelModel } from '../../channel/models/channel.model';
import { UserModel } from '../../users/models/user.model';

@ObjectType()
export class ThreadModel {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => ChannelModel)
  channel: ChannelModel;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => Int)
  numberOfMessages: number;
}
