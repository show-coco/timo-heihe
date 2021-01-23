import { UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { GqlJwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { Payload } from 'src/auth/types/payload';
import { CurrentUser } from './dto/current-user';
import { UserModel } from './models/user.model';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

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
}
