import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Team } from './entities/teams.entity';
import { TeamsResolver } from './teams.resolver';
import { TeamsService } from './teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), UsersModule],
  exports: [TeamsService],
  providers: [TeamsService, TeamsResolver],
})
export class TeamsModule {}
