import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RecruitmentLevelModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
