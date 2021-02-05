import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteRoomResponse {
  @Field(() => Int, { nullable: true })
  affected?: number;
}
