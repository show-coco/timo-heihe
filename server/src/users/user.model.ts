import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  introduction: string;

  @Field({ nullable: true })
  github_id: string;

  @Field({ nullable: true })
  twitter_id: string;
}
