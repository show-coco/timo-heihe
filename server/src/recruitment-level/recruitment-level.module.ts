import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitmentLevel } from './entities/recruitment-level.entity';
import { RecruitmentLevelResolver } from './recruitment-level.resolver';
import { RecruitmentLevelService } from './recruitment-level.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecruitmentLevel])],
  providers: [RecruitmentLevelResolver, RecruitmentLevelService],
})
export class RecruitmentLevelModule {}
