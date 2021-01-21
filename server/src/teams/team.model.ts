import { Field, GraphQLTimestamp, Int, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/users/user.model';

@ObjectType()
export class TeamModel {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  icon?: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  skills?: string;

  @Field()
  owner: UserModel;

  @Field(() => [UserModel], { nullable: true })
  members?: UserModel[];

  @Field(() => GraphQLTimestamp, { nullable: true })
  createdAt?: Date;
}
