import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { RoomMembersUserService } from './room-members-user.service';
import { MemberState } from './entities/room-members-user.entity';
import { UpdateRoomMembersUserInput } from './dto/update-room-members-user.input';
import { RoomMembersUserModel } from './models/room-members-user.model';
import { RemoveResult } from './models/remove-result';

@Resolver(() => RoomMembersUserModel)
export class RoomMembersUserResolver {
  constructor(
    private readonly roomMembersUserService: RoomMembersUserService,
  ) {}

  @Mutation(() => RoomMembersUserModel)
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

  @Query(() => [RoomMembersUserModel], { name: 'teamMembersUser' })
  findAll() {
    return this.roomMembersUserService.findAll();
  }

  @Query(() => RoomMembersUserModel, { name: 'teamMembersUser' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.roomMembersUserService.findOne(id);
  }

  @Mutation(() => RoomMembersUserModel)
  updateTeamMembersUser(
    @Args('updateTeamMembersUserInput')
    updateTeamMembersUserInput: UpdateRoomMembersUserInput,
  ) {
    return this.roomMembersUserService.update(
      updateTeamMembersUserInput.id,
      updateTeamMembersUserInput,
    );
  }

  @Mutation(() => RemoveResult)
  removeTeamMembersUser(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('roomId', { type: () => Int }) roomId: number,
  ) {
    return this.roomMembersUserService.remove(roomId, userId);
  }
}
