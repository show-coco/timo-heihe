import { Module } from '@nestjs/common';
import { UsersResolver } from './user.resolver';

@Module({
  providers: [UsersResolver],
})
export class UsersModule {}
