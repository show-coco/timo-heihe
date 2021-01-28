import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Team } from './entities/teams.entity';
import { TeamsResolver } from './teams.resolver';
import { TeamsService } from './teams.service';

describe('TeamsService', () => {
  let service: TeamsService;

  beforeEach(async () => {
    const team: Team = {
      id: 1,
      title: 'sample',
      icon: 'sample',
      description: 'sample',
      skills: [],
      owner: { id: '1' },
      members: [],
      categories: [],
      repositoryUrl: 'sample',
      recruitNumbers: 10,
      isRequired: false,
      createdAt: new Date(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: getRepositoryToken(Team),
          useValue: {
            findOne: (): Team => {
              return team;
            },
            findAll: (): Team[] => {
              return [team];
            },
          },
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
