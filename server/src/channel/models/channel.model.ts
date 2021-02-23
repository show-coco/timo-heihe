import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ThreadModel } from '../../thread/models/thread.model';
import { UserModel } from '../../users/models/user.model';
import { TeamModel } from '../../teams/models/team.model';

@ObjectType()
export class ChannelModel {
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
