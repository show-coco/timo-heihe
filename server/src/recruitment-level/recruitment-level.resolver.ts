import { Query, Resolver } from '@nestjs/graphql';
import { RecruitmentLevelModel } from './models/recruitment-level.model';
import { RecruitmentLevelService } from './recruitment-level.service';

@Resolver(() => RecruitmentLevelModel)
export class RecruitmentLevelResolver {
  constructor(private recruitmentService: RecruitmentLevelService) {}

  @Query(() => [RecruitmentLevelModel])
  recruitmentLevels() {
    return this.recruitmentService.findAll();
  }
}
