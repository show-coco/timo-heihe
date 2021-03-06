import { Field, InputType } from '@nestjs/graphql';
import { MemberState } from '../../room-members-user/entities/room-members-user.entity';

@InputType()
export class MyRoomsInput {
  @Field(() => MemberState)
  memberState: MemberState;

  @Field(() => Boolean, { nullable: true })
  iAmOwner?: boolean;
}
