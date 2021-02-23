import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from '../teams/teams.module';
import { Channel } from './entities/channel.entity';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), TeamsModule],
  providers: [ChannelResolver, ChannelService],
})
export class ChannelModule {}
