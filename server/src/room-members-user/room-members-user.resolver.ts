import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { RoomMembersUserService } from './room-members-user.service';
import {
  MemberState,
  RoomMembersUser,
} from './entities/room-members-user.entity';
import { UpdateRoomMembersUserInput } from './dto/update-room-members-user.input';

@Resolver(() => RoomMembersUser)
export class RoomMembersUserResolver {
  constructor(
    private readonly roomMembersUserService: RoomMembersUserService,
  ) {}

  @Mutation(() => RoomMembersUser)
  createTeamMembersUser(
    @Args('userId', { type: () => ID }) userId: number,
    @Args('userId', { type: () => Int }) teamId: number,
  ) {
    return this.roomMembersUserService.create(
      teamId,
      userId,
      MemberState.JOINING,
    );
  }

  @Query(() => [RoomMembersUser], { name: 'teamMembersUser' })
  findAll() {
    return this.roomMembersUserService.findAll();
  }

  @Query(() => RoomMembersUser, { name: 'teamMembersUser' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.roomMembersUserService.findOne(id);
  }

  @Mutation(() => RoomMembersUser)
  updateTeamMembersUser(
    @Args('updateTeamMembersUserInput')
    updateTeamMembersUserInput: UpdateRoomMembersUserInput,
  ) {
    return this.roomMembersUserService.update(
      updateTeamMembersUserInput.id,
      updateTeamMembersUserInput,
    );
  }

  @Mutation(() => RoomMembersUser)
  removeTeamMembersUser(
    @Args('id', { type: () => ID }) userId: number,
    @Args('id', { type: () => Int }) teamId: number,
  ) {
    return this.roomMembersUserService.remove(teamId, userId);
  }
}
