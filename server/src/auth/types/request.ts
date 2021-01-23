import { User } from 'src/users/entities/users.entity';

export type RequestWithUser = Request & {
  user: User;
};
