import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { SkillModule } from '../skill/skill.module';
import { TeamsModule } from '../teams/teams.module';
import { TeamMembersUserModule } from 'src/team-members-user/team-members-user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    SkillModule,
    TeamMembersUserModule,
    forwardRef(() => TeamsModule),
  ],
  exports: [UsersService],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
