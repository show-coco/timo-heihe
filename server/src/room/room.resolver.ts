import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CategoryService } from '../category/category.service';
import { SkillService } from '../skill/skill.service';
import { UserModel } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Room } from './entities/room.entity';
import { RoomModel } from './models/room.model';
import { RoomService } from './room.service';
import { SearchRoomInput } from './dto/search-room.input';
import { GqlJwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { CurrentUser } from 'src/users/dto/current-user';
import { Payload } from 'src/auth/types/payload';
import { MyRoomsInput } from './dto/my-rooms.input';

@Resolver(() => RoomModel)
export class RoomResolver {
  constructor(
    private roomService: RoomService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private skillService: SkillService,
    private categoryService: CategoryService,
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
  updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput) {
    return this.roomService.update(updateRoomInput);
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

  // @Mutation(() => RoomModel)
  // @UseGuards(GqlJwtAuthGuard)
  // async applyRoom(
  //   @Args('userId', { type: () => Int }) userId: number,
  //   @Args('roomId', { type: () => Int }) roomId: number,
  // ) {
  //   return this.roomService.apply(userId, roomId);
  // }

  @ResolveField(() => UserModel)
  owner(@Parent() room: Room) {
    return this.usersService.findOne(room.owner.userId);
  }

  @ResolveField(() => UserModel)
  async skills(@Parent() room: Room) {
    // console.log('request on rooms->resolver->skills', room);

    return await room.skills.map(async (skill) => {
      return await this.skillService.findOne(skill.id);
    });
  }

  @ResolveField(() => UserModel)
  async categories(@Parent() room: Room) {
    return await room.categories.map(async (category) => {
      return await this.categoryService.findOne(category.id);
    });
  }
}
