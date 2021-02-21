import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamType } from './entities/team-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamType])],
})
export class TeamTypeModule {}
