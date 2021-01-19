import { Field, GraphQLTimestamp, ID, Int, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/users/user.model';

@ObjectType()
export class TeamModel {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  skills?: string;

  @Field()
  owner: UserModel;

  @Field(() => UserModel)
  members: UserModel[];

  @Field(() => GraphQLTimestamp)
  created_at: Date;
}
