import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class SkillInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  icon: string;
}
