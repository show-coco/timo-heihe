import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TeamModel } from 'src/teams/models/team.model';

@ObjectType()
export class CategoryModel {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field(() => [TeamModel])
  teams: TeamModel[];
}
