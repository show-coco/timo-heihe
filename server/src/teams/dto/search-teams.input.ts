import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SearchTeamInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => [Int], { nullable: true })
  skillIds?: number[];

  @Field(() => [Int], { nullable: true })
  categoryIds?: number[];

  @Field(() => Int, { nullable: true })
  recruitNumbers?: number;
}
