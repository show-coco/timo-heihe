import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { UserModel } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
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

  @Mutation(() => TeamModel)
  updateTeam(@Args('updateTeamInput') updateTeamInput: UpdateTeamInput) {
    return this.teamsService.update(updateTeamInput.id, updateTeamInput);
  }

  @Mutation(() => TeamModel)
  createTeam(@Args('createTeamInput') createTeamInput: CreateTeamInput) {
    return this.teamsService.insert(createTeamInput);
  }

  @Mutation(() => TeamModel)
  deleteTeam(@Args('id') id: number) {
    return this.teamsService.remove(id);
  }

  @ResolveProperty(() => UserModel)
  owner(@Parent() team: TeamModel) {
    console.log(team.owner.id);
    return this.usersService.findOne(team.owner.id);
  }
}
