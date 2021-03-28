import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { RoomModel } from 'src/room/models/room.model';
import { UserModel } from 'src/users/models/user.model';
import { State } from '../entities/room-applying-user.entity';

registerEnumType(State, {
  name: 'State',
});

@ObjectType()
export class RoomApplyingUserModel {
  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => RoomModel, { nullable: true })
  room?: RoomModel;

  @Field(() => State)
  state: State;
}
