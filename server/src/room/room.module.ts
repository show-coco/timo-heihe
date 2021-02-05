import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomResolver, RoomService],
})
export class RoomModule {}
