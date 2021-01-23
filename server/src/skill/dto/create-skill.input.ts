import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSkillInput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  icon: string;
}
