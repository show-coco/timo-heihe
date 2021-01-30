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
import { TeamMemberModel } from 'src/team-members-user/models/team-member.model';
import { CategoryService } from '../category/category.service';
import { SkillService } from '../skill/skill.service';
import { UserModel } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team } from './entities/teams.entity';
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
    console.log('request on teams->resolver->createTeam', createTeamInput);
    return this.teamsService.insert(createTeamInput);
  }

  @Mutation(() => TeamModel)
  deleteTeam(@Args('id', { type: () => Int }) id: number) {
    return this.teamsService.remove(id);
  }

  @Mutation(() => TeamModel)
  async joinTeam(
    @Args('userId') userId: string,
    @Args('teamId', { type: () => Int }) teamId: number,
  ) {
    return this.teamsService.join(userId, teamId);
  }

  @Mutation(() => TeamModel)
  async applyTeam(
    @Args('userId') userId: string,
    @Args('teamId', { type: () => Int }) teamId: number,
  ) {
    return this.teamsService.apply(userId, teamId);
  }

  @Mutation(() => TeamModel)
  async leaveTeam(
    @Args('userId') userId: string,
    @Args('teamId', { type: () => Int }) teamId: number,
  ) {
    return this.teamsService.leave(userId, teamId);
  }

  @ResolveProperty(() => UserModel)
  owner(@Parent() team: Team) {
    return this.usersService.findOne(team.owner.id);
  }

  @ResolveProperty(() => TeamMemberModel)
  async members(@Parent() team: Team) {
    // console.log('request on teams->resolver->members', team.members);

    return await team.members.map((member) => ({
      createdAt: member.createdAt,
      memberState: member.memberState,
      ...member.user,
    }));
  }

  @ResolveProperty(() => UserModel)
  async skills(@Parent() team: Team) {
    // console.log('request on teams->resolver->skills', team);

    return await team.skills.map(async (skill) => {
      return await this.skillService.findOne(skill.id);
    });
  }

  @ResolveProperty(() => UserModel)
  async categories(@Parent() team: Team) {
    return await team.categories.map(async (category) => {
      return await this.categoryService.findOne(category.id);
    });
  }
}
