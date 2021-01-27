import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { TeamsResolver } from './teams.resolver';
import { TeamsService } from './teams.service';
import { SkillModule } from '../skill/skill.module';
import { CategoryModule } from '../category/category.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/teams.entity';
import { Skill } from '../skill/entities/skill.entity';
import { Category } from '../category/entities/category.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { User } from '../users/entities/users.entity';

describe('TeamsResolver', () => {
  let resolver: TeamsResolver;

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
      imports: [UsersModule, SkillModule, CategoryModule],
      providers: [
        TeamsResolver,
        TeamsService,
        {
          provide: getRepositoryToken(Team),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Skill),
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<TeamsResolver>(TeamsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
