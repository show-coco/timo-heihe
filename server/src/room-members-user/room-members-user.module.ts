import { Module } from '@nestjs/common';
import { RoomMembersUserService } from './room-members-user.service';
import { RoomMembersUserResolver } from './room-members-user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomMembersUser } from './entities/room-members-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomMembersUser])],
  providers: [RoomMembersUserResolver, RoomMembersUserService],
  exports: [RoomMembersUserService],
})
export class RoomMembersUserModule {}
