import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMembersUserModule } from 'src/team-members-user/team-members-user.module';
import { CategoryModule } from '../category/category.module';
import { SkillModule } from '../skill/skill.module';
import { UsersModule } from '../users/users.module';
import { Team } from './entities/teams.entity';
import { TeamsResolver } from './teams.resolver';
import { TeamsService } from './teams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
    forwardRef(() => UsersModule),
    TeamMembersUserModule,
    SkillModule,
    CategoryModule,
  ],
  exports: [TeamsService],
  providers: [TeamsService, TeamsResolver],
})
export class TeamsModule {}
