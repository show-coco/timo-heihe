import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamType } from './entities/team-type.entity';

@Injectable()
export class TeamTypeService {
  constructor(
    @InjectRepository(TeamType)
    private teamTypeRepository: Repository<TeamType>,
  ) {}

  async findAll() {
    const res = await this.teamTypeRepository.find();

    console.log('response on team-type->service->findAll', res);
    return res;
  }
}
