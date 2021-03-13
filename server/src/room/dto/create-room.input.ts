import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field()
  slug: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  icon?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Int)
  owner: number;

  @Field(() => [Int], { nullable: true })
  skills?: number[];

  @Field(() => [Int])
  categories: number[];

  @Field({ nullable: true })
  repositoryUrl?: string;

  @Field()
  withApplication: boolean;

  @Field(() => [Int])
  typeIds: number[];
}
