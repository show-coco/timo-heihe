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
    const team = this.teamRepository.findOne({
      id: id,
    });
    console.log(team);
    return team;
  }

  async findAll() {
    return this.teamRepository.find();
  }
}
