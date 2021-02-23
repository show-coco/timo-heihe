import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './entities/room-type.entity';
import { RoomTypeResolver } from './room-type.resolver';
import { RoomTypeService } from './room-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType])],
  providers: [RoomTypeResolver, RoomTypeService],
})
export class RoomTypeModule {}
