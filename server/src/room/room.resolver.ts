import { forwardRef, Inject } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { TeamMemberModel } from '../team-members-user/models/team-member.model';
import { CategoryService } from '../category/category.service';
import { SkillService } from '../skill/skill.service';
import { UserModel } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Room } from './entities/room.entity';
import { RoomModel } from './models/room.model';
import { RoomService } from './room.service';
import { ChannelModel } from '../channel/models/channel.model';
import { SearchRoomInput } from './dto/search-room.input';

@Resolver(() => RoomModel)
export class RoomResolver {
  constructor(
    private roomService: RoomService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private skillService: SkillService,
    private categoryService: CategoryService,
  ) {}

  @Query(() => RoomModel)
  team(@Args('id', { type: () => Int }) id: number) {
    return this.roomService.findOne(id);
  }

  @Query(() => [RoomModel])
  teams(@Args('input', { nullable: true }) input?: SearchRoomInput) {
    return this.roomService.findAll(input);
  }

  @Mutation(() => RoomModel)
  updateTeam(@Args('updateTeamInput') updateTeamInput: UpdateRoomInput) {
    return this.roomService.update(updateTeamInput);
  }

  @Mutation(() => RoomModel)
  createTeam(@Args('input') input: CreateRoomInput) {
    console.log('request on teams->resolver->createTeam', input);
    return this.roomService.insert(input);
  }

  @Mutation(() => RoomModel)
  deleteTeam(@Args('id', { type: () => Int }) id: number) {
    return this.roomService.remove(id);
  }

  @Mutation(() => RoomModel)
  async joinTeam(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('teamId', { type: () => Int }) teamId: number,
  ) {
    return this.roomService.join(userId, teamId);
  }

  @Mutation(() => RoomModel)
  async applyTeam(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('teamId', { type: () => Int }) teamId: number,
  ) {
    return this.roomService.apply(userId, teamId);
  }

  @Mutation(() => RoomModel)
  async leaveTeam(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('teamId', { type: () => Int }) teamId: number,
  ) {
    return this.roomService.leave(userId, teamId);
  }

  @ResolveProperty(() => UserModel)
  owner(@Parent() team: Room) {
    return this.usersService.findOne(team.owner.userId);
  }

  @ResolveProperty(() => TeamMemberModel)
  async members(@Parent() team: Room) {
    // console.log('request on teams->resolver->members', team.members);

    return await team.members.map((member) => ({
      createdAt: member.createdAt,
      memberState: member.memberState,
      ...member.user,
    }));
  }

  @ResolveProperty(() => UserModel)
  async skills(@Parent() team: Room) {
    // console.log('request on teams->resolver->skills', team);

    return await team.skills.map(async (skill) => {
      return await this.skillService.findOne(skill.id);
    });
  }

  @ResolveProperty(() => UserModel)
  async categories(@Parent() team: Room) {
    return await team.categories.map(async (category) => {
      return await this.categoryService.findOne(category.id);
    });
  }

  @ResolveField(() => ChannelModel)
  async rooms(@Parent() team: Room) {
    console.log('request on teams->resolver->rooms', team);
  }
}
