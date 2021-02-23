import { Query, Resolver } from '@nestjs/graphql';
import { RoomTypeModel } from './models/room-type.model';
import { RoomTypeService } from './room-type.service';

@Resolver()
export class RoomTypeResolver {
  constructor(private roomTypeService: RoomTypeService) {}

  @Query(() => [RoomTypeModel])
  roomTypes() {
    return this.roomTypeService.findAll();
  }
}
