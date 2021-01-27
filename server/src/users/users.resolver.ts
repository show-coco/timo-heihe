import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlJwtAuthGuard } from '../auth/jwt-auth.guards';
import { Payload } from '../auth/types/payload';
import { CurrentUser } from './dto/current-user';
import { UserModel } from './models/user.model';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { SkillModel } from '../skill/models/skill.model';
import { SkillService } from '../skill/skill.service';
import { TeamsService } from '../teams/teams.service';
import { TeamModel } from '../teams/models/team.model';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private skillService: SkillService,
    @Inject(forwardRef(() => TeamsService)) private teamsService: TeamsService,
  ) {}

  @Query(() => UserModel)
  @UseGuards(GqlJwtAuthGuard)
  async me(@CurrentUser() user: Payload) {
    return this.usersService.findOne(user.sub);
  }

  @Query(() => UserModel)
  async user(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Query(() => [UserModel])
  async users() {
    return this.usersService.findAll();
  }

  @Mutation(() => UserModel)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput);
  }

  @ResolveField(() => [SkillModel])
  async skills(@Parent() user: UserModel) {
    return await user.skills.map(async (skill) => {
      return await this.skillService.findOne(skill.id);
    });
  }

  @ResolveField(() => [TeamModel])
  async teams(@Parent() user: UserModel) {
    return await user.teams.map(async (team) => {
      return await this.teamsService.findOne(team.id);
    });
  }
}
