import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamType } from './entities/team-type.entity';
import { TeamTypeResolver } from './team-type.resolver';
import { TeamTypeService } from './team-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamType])],
  providers: [TeamTypeResolver, TeamTypeService],
})
export class TeamTypeModule {}
