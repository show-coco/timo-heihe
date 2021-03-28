import { Field, InputType } from '@nestjs/graphql';
import { State } from '../../room-applying-user/entities/room-applying-user.entity';

@InputType()
export class MyRoomsInput {
  @Field(() => Boolean, { nullable: true })
  iAmOwner?: boolean;

  @Field(() => State, { nullable: true })
  state?: State;
}
