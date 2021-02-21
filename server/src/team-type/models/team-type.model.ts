import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TeamTypeModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
