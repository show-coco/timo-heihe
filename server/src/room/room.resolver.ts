import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { RoomModel } from './models/room.model';
import { RoomService } from './room.service';

@Resolver()
export class RoomResolver {
  constructor(private roomService: RoomService) {}

  @Query(() => RoomModel)
  room(@Args('id', { type: () => Int }) id: number) {
    return this.roomService.findOne(id);
  }

  @Query(() => [RoomModel])
  rooms() {
    return this.roomService.findAll();
  }
}
