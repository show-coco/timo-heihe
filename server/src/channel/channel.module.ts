import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from '../room/room.module';
import { Channel } from './entities/channel.entity';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), RoomModule],
  providers: [ChannelResolver, ChannelService],
})
export class ChannelModule {}
