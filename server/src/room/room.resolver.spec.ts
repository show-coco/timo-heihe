import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';
import { SkillModule } from '../skill/skill.module';
import { CategoryModule } from '../category/category.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Skill } from '../skill/entities/skill.entity';

describe('TeamsResolver', () => {
  let resolver: RoomResolver;

  beforeEach(async () => {
    // const team: Team = {
    //   id: 1,
    //   title: 'sample',
    //   icon: 'sample',
    //   description: 'sample',
    //   skills: [],
    //   owner: { id: 1 },
    //   members: [],
    //   categories: [],
    //   repositoryUrl: 'sample',
    //   recruitNumbers: 10,
    //   isRequired: false,
    //   createdAt: new Date(),
    //   rooms: []
    // };
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [UsersModule, SkillModule, CategoryModule],
    //   providers: [
    //     TeamsResolver,
    //     TeamsService,
    //     {
    //       provide: getRepositoryToken(Team),
    //       useValue: {},
    //     },
    //     {
    //       provide: getRepositoryToken(Skill),
    //       useValue: {},
    //     },
    //   ],
    // }).compile();
    // resolver = module.get<TeamsResolver>(TeamsResolver);
  });

  it('should be defined', () => {
    // expect(resolver).toBeDefined();
  });
});
