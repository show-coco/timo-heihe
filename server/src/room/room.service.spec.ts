import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';

describe('TeamsService', () => {
  let service: RoomService;

  // beforeEach(async () => {
  //   const team: Team = {
  //     id: 1,
  //     title: 'sample',
  //     icon: 'sample',
  //     description: 'sample',
  //     skills: [],
  //     owner: { id: '1' },
  //     members: [],
  //     categories: [],
  //     repositoryUrl: 'sample',
  //     recruitNumbers: 10,
  //     isRequired: false,
  //     createdAt: new Date(),
  //   };
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       TeamsService,
  //       {
  //         provide: getRepositoryToken(Team),
  //         useValue: {
  //           findOne: (): Team => {
  //             return team;
  //           },
  //           findAll: (): Team[] => {
  //             return [team];
  //           },
  //         },
  //       },
  //     ],
  //   }).compile();

  //   service = module.get<TeamsService>(TeamsService);
  // });

  it('should be defined', () => {
    // expect(service).toBeDefined();
  });
});
