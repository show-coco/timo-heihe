import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SearchRoomInput {
  @Field({ nullable: true })
  title?: string;

  @Field(() => [Int], { nullable: true })
  skillIds?: number[];

  @Field(() => [Int], { nullable: true })
  categoryIds?: number[];

  @Field(() => Int, { nullable: true })
  typeId?: number;
}
