import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ThreadModel } from '../../thread/models/thread.model';
import { UserModel } from '../../users/models/user.model';
import { RoomModel } from '../../room/models/room.model';

@ObjectType()
export class ChannelModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => RoomModel)
  room: RoomModel;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => [ThreadModel])
  threads: ThreadModel[];
}
