import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecruitmentLevel } from './entities/recruitment-level.entity';

@Injectable()
export class RecruitmentLevelService {
  constructor(
    @InjectRepository(RecruitmentLevel)
    private recruitmentLevel: Repository<RecruitmentLevel>,
  ) {}

  async findAll(): Promise<RecruitmentLevel[]> {
    const res = this.recruitmentLevel
      .createQueryBuilder('recruitmentLevel')
      .getMany();

    console.log('response on recruitmentLevel->service->findAll', res);
    return res;
  }
}
