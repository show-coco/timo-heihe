import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ThreadModel } from 'src/thread/models/thread.model';
import { UserModel } from 'src/users/models/user.model';
import { TeamModel } from '../../teams/models/team.model';

@ObjectType()
export class RoomModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => TeamModel)
  team: TeamModel;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => [ThreadModel])
  threads: ThreadModel[];
}
