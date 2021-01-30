import { Test, TestingModule } from '@nestjs/testing';
import { TeamMembersUserResolver } from './team-members-user.resolver';
import { TeamMembersUserService } from './team-members-user.service';

describe('TeamMembersUserResolver', () => {
  let resolver: TeamMembersUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamMembersUserResolver, TeamMembersUserService],
    }).compile();

    resolver = module.get<TeamMembersUserResolver>(TeamMembersUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
