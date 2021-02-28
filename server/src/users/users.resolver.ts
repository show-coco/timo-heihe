import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import {
  Args,
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
import { RoomService } from '../room/room.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UserMemberModel } from '../room-members-user/models/user-member-model';
import { MemberState } from 'src/room-members-user/entities/room-members-user.entity';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private skillService: SkillService,
    @Inject(forwardRef(() => RoomService)) private roomService: RoomService,
  ) {}

  @Query(() => UserModel)
  @UseGuards(GqlJwtAuthGuard)
  async me(@CurrentUser() user: Payload) {
    return this.usersService.findById(user.sub);
  }

  @Query(() => UserModel)
  async user(@Args('userId') userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }

  @Query(() => [UserModel])
  async users() {
    return this.usersService.findAll();
  }

  @Mutation(() => UserModel)
  @UseGuards(GqlJwtAuthGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput);
  }

  @ResolveField(() => [SkillModel])
  async skills(@Parent() user: UserModel) {
    return await user.skills.map(async (skill) => {
      return await this.skillService.findOne(skill.id);
    });
  }

  @ResolveField(() => [UserMemberModel])
  rooms(@Parent() user: User) {
    console.log('request on users->resolver->rooms', user);

    const userDontHaveRoom = user.rooms.some((room) => room.room === null);

    console.log('user doesnt have rooms', userDontHaveRoom);

    if (userDontHaveRoom) {
      return null;
    }

    user.rooms = user.rooms.filter(
      (room) => room.memberState === MemberState.JOINING,
    );

    return user.rooms.map(async (room) => {
      const returns = await this.roomService.findOne(room.room.id);
      const members = returns.members.map((member) => ({ ...member.user }));
      const res = {
        createdAt: room.createdAt,
        memberState: room.memberState,
        ...returns,
        members: members,
      };
      console.log('response on', res);
      return res;
    });
  }
}
