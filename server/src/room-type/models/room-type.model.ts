import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoomTypeModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
