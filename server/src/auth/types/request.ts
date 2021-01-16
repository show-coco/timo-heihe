import { User } from 'src/users/users.entity';

export type RequestWithUser = Request & {
  user: User;
};
