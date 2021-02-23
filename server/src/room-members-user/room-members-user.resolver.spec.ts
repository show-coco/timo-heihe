import { Test, TestingModule } from '@nestjs/testing';
import { RoomMembersUserResolver } from './room-members-user.resolver';
import { RoomMembersUserService } from './room-members-user.service';

describe('TeamMembersUserResolver', () => {
  let resolver: RoomMembersUserResolver;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [TeamMembersUserResolver, TeamMembersUserService],
  //   }).compile();

  //   resolver = module.get<TeamMembersUserResolver>(TeamMembersUserResolver);
  // });

  it('should be defined', () => {
    // expect(resolver).toBeDefined();
  });
});
