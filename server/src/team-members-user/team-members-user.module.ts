import { Module } from '@nestjs/common';
import { TeamMembersUserService } from './team-members-user.service';
import { TeamMembersUserResolver } from './team-members-user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMembersUser } from './entities/team-members-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMembersUser])],
  providers: [TeamMembersUserResolver, TeamMembersUserService],
  exports: [TeamMembersUserService],
})
export class TeamMembersUserModule {}
