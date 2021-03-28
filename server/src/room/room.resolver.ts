import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { RoomModel } from './models/room.model';
import { RoomService } from './room.service';
import { SearchRoomInput } from './dto/search-room.input';
import { GqlJwtAuthGuard } from '../auth/jwt-auth.guards';
import { CurrentUser } from '../users/dto/current-user';
import { Payload } from '../auth/types/payload';
import { MyRoomsInput } from './dto/my-rooms.input';

@Resolver(() => RoomModel)
export class RoomResolver {
  constructor(
    private roomService: RoomService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  @Query(() => RoomModel)
  room(@Args('slug') slug: string) {
    return this.roomService.findOneBySlug(slug);
  }

  @Query(() => [RoomModel])
  rooms(@Args('input', { nullable: true }) input?: SearchRoomInput) {
    return this.roomService.findAll(input);
  }

  @Query(() => [RoomModel])
  @UseGuards(GqlJwtAuthGuard)
  myRooms(@CurrentUser() user: Payload, @Args('input') input: MyRoomsInput) {
    return this.roomService.findAllByUserId(user.sub, input);
  }

  @Mutation(() => RoomModel)
  @UseGuards(GqlJwtAuthGuard)
  updateRoom(@Args('input') input: UpdateRoomInput) {
    return this.roomService.update(input);
  }

  @Mutation(() => RoomModel)
  @UseGuards(GqlJwtAuthGuard)
  createRoom(@Args('input') input: CreateRoomInput) {
    console.log('request on rooms->resolver->createRoom', input);
    return this.roomService.insert(input);
  }

  @Mutation(() => RoomModel)
  @UseGuards(GqlJwtAuthGuard)
  deleteRoom(@Args('id', { type: () => Int }) id: number) {
    return this.roomService.remove(id);
  }

  @Mutation(() => RoomModel)
  @UseGuards(GqlJwtAuthGuard)
  async applyRoom(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('roomId', { type: () => Int }) roomId: number,
  ) {
    return this.roomService.apply(userId, roomId);
  }

  @Mutation(() => RoomModel)
  @UseGuards(GqlJwtAuthGuard)
  rejectApplication(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('roomId', { type: () => Int }) roomId: number,
  ) {
    return this.roomService.rejectApplication(userId, roomId);
  }

  @Mutation(() => RoomModel)
  @UseGuards(GqlJwtAuthGuard)
  acceptApplication(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('roomId', { type: () => Int }) roomId: number,
  ) {
    return this.roomService.acceptApplication(userId, roomId);
  }
}
