import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomApplyingUser } from './entities/room-applying-user.entity';
import { RoomApplyingUserService } from './room-applying-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomApplyingUser])],
  providers: [RoomApplyingUserService],
  exports: [RoomApplyingUserService],
})
export class RoomApplyingUserModule {}
