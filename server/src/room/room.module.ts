import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomApplyingUserModule } from 'src/room-applying-user/room-applying-user.module';
import { CategoryModule } from '../category/category.module';
import { SkillModule } from '../skill/skill.module';
import { UsersModule } from '../users/users.module';
import { Room } from './entities/room.entity';
import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    forwardRef(() => UsersModule),
    SkillModule,
    CategoryModule,
    RoomApplyingUserModule,
  ],
  exports: [RoomService],
  providers: [RoomService, RoomResolver],
})
export class RoomModule {}
