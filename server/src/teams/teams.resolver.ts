import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { UserModel } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { TeamModel } from './team.model';
import { TeamsService } from './teams.service';

@Resolver(() => TeamModel)
export class TeamsResolver {
  constructor(
    private teamsService: TeamsService,
    private usersService: UsersService,
  ) {}

  @Query(() => TeamModel)
  team(@Args('id', { type: () => Int }) id: number) {
    return this.teamsService.findOne(id);
  }

  @Query(() => [TeamModel])
  teams() {
    return this.teamsService.findAll();
  }

  // FIXME: ネストQueryができない
  @ResolveProperty(() => UserModel)
  owner(@Parent() team: TeamModel) {
    console.log(team);
    return this.usersService.findOne(team.owner.id);
  }
}
