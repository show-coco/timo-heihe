import { User } from '../../users/entities/users.entity';

export type RequestWithUser = Request & {
  user: User;
};
