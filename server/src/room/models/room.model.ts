import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TeamModel } from '../../teams/models/team.model';

@ObjectType()
export class RoomModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => TeamModel)
  team: TeamModel;
}
