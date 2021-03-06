import { Field, ObjectType } from '@nestjs/graphql';
import { RoomModel } from 'src/room/models/room.model';
import { UserModel } from 'src/users/models/user.model';
import { MemberState } from '../entities/room-members-user.entity';

@ObjectType()
export class RoomMembersUserModel {
  @Field(() => UserModel)
  user: UserModel;

  @Field(() => RoomModel)
  room: RoomModel;

  @Field(() => MemberState)
  memberState: MemberState;
}
