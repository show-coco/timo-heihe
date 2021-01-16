import { Args, ID, Query, Resolver } from '@nestjs/graphql';
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
  async users() {
    return this.usersService.findAll();
  }
}
