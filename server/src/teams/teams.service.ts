import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './teams.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async findOne(id: number) {
    return this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.owner', 'user')
      .where({ id: id })
      .getOne();
  }

  async findAll() {
    return await this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.owner', 'user')
      .getMany();
  }
}
