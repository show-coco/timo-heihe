import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitmentLevel } from './entities/recruitment-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecruitmentLevel])],
})
export class RecruitmentLevelModule {}
