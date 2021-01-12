import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user';

const users = [
  {
    id: 'veavev1',
    name: 'TestUser1',
  },
  {
    id: 'veaveva2',
    name: 'TestUser2',
  },
];

@Resolver('Users')
export class UsersResolver {
  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return users;
  }
}
