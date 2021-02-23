import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RoomModel } from '../../room/models/room.model';

@ObjectType()
export class CategoryModel {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field(() => [RoomModel])
  rooms: RoomModel[];
}
