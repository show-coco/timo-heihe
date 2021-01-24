import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { SkillModule } from 'src/skill/skill.module';
import { UsersModule } from 'src/users/users.module';
import { Team } from './entities/teams.entity';
import { TeamsResolver } from './teams.resolver';
import { TeamsService } from './teams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
    UsersModule,
    SkillModule,
    CategoryModule,
  ],
  exports: [TeamsService],
  providers: [TeamsService, TeamsResolver],
})
export class TeamsModule {}
