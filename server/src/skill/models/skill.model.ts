import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SkillModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  icon: string;
}
