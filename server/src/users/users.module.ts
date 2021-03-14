import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { SkillModule } from '../skill/skill.module';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    SkillModule,
    forwardRef(() => RoomModule),
  ],
  exports: [UsersService],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
