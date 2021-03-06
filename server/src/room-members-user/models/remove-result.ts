import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemoveResult {
  @Field(() => Boolean)
  ok: boolean;
}
