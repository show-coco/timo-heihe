import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChannelResponse {
  @Field(() => Int, { nullable: true })
  affected?: number;
}
