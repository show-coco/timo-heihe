import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MyRoomsInput {
  @Field(() => Boolean, { nullable: true })
  iAmOwner?: boolean;
}
