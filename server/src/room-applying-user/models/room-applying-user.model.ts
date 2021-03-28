import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { RoomModel } from '../../room/models/room.model';
import { UserModel } from '../../users/models/user.model';
import { State } from '../entities/room-applying-user.entity';

registerEnumType(State, {
  name: 'State',
});

@ObjectType()
export class RoomApplyingUserModel {
  @Field(() => UserModel)
  user: UserModel;

  @Field(() => RoomModel)
  room: RoomModel;

  @Field(() => State)
  state: State;
}
