import { forwardRef, Inject } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { CategoryService } from 'src/category/category.service';
import { SkillService } from 'src/skill/skill.service';
import { UserModel } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { TeamModel } from './models/team.model';
import { TeamsService } from './teams.service';

@Resolver(() => TeamModel)
export class TeamsResolver {
  constructor(
    private teamsService: TeamsService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private skillService: SkillService,
    private categoryService: CategoryService,
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
    return this.usersService.findOne(team.owner.id);
  }

  @ResolveProperty(() => UserModel)
  async members(@Parent() team: TeamModel) {
    return await team.members.map(async (member) => {
      return await this.usersService.findOne(member.id);
    });
  }

  @ResolveProperty(() => UserModel)
  async skills(@Parent() team: TeamModel) {
    return await team.skills.map(async (skill) => {
      return await this.skillService.findOne(skill.id);
    });
  }

  @ResolveProperty(() => UserModel)
  async categories(@Parent() team: TeamModel) {
    return await team.categories.map(async (category) => {
      return await this.categoryService.findOne(category.id);
    });
  }
}
