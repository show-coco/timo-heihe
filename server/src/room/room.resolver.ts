import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TeamModel } from '../teams/models/team.model';
import { TeamsService } from '../teams/teams.service';
import { CreateRoomInput } from './dto/create-room.input';
import { Room } from './entities/room.entity';
import { DeleteRoomResponse } from './models/delete-room';
import { RoomModel } from './models/room.model';
import { RoomService } from './room.service';

@Resolver(() => RoomModel)
export class RoomResolver {
  constructor(
    private roomService: RoomService,
    private teamService: TeamsService,
  ) {}

  @Query(() => RoomModel)
  room(@Args('id', { type: () => Int }) id: number) {
    return this.roomService.findOne(id);
  }

  @Query(() => [RoomModel])
  rooms() {
    return this.roomService.findAll();
  }

  @Mutation(() => RoomModel)
  createRoom(@Args('input') input: CreateRoomInput) {
    return this.roomService.create(input);
  }

  @Mutation(() => DeleteRoomResponse)
  deleteRoom(@Args('id', { type: () => Int }) id: number) {
    return this.roomService.delete(id);
  }

  @ResolveField(() => TeamModel)
  team(@Parent() room: Room) {
    const res = this.teamService.findOne(room.team.id);

    console.log('response on room->resolver->team', res);
    return res;
  }
}
