import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { SkillModule } from 'src/skill/skill.module';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    SkillModule,
    forwardRef(() => TeamsModule),
  ],
  exports: [UsersService],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
