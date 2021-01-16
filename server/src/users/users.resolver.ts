import { UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { GqlJwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { UserModel } from './user.model';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Resolver((of) => UserModel)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => UserModel)
  async user(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Query(() => [UserModel])
  @UseGuards(GqlJwtAuthGuard)
  async users() {
    return this.usersService.findAll();
  }
}
