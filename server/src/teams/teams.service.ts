import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
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
    return this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.owner', 'user')
      .getMany();
  }

  async update(id: number, updateTeamInput: UpdateTeamInput) {
    const input = JSON.parse(JSON.stringify(updateTeamInput));

    const returns = await this.teamRepository
      .createQueryBuilder()
      .update(Team, input)
      .where({ id })
      .returning(['id', 'title', 'description', 'skills', 'created_at'])
      .updateEntity(true)
      .execute();

    return returns.raw[0];
  }

  async insert(createTeamInput: CreateTeamInput) {
    const input = JSON.parse(JSON.stringify(createTeamInput));

    const returns = await this.teamRepository
      .createQueryBuilder()
      .insert()
      .into(Team)
      .values(input)
      .returning(['id', 'title', 'description', 'skills', 'created_at'])
      .updateEntity(true)
      .execute();

    return returns.raw[0];
  }

  async remove(id: number) {
    const returns = await this.teamRepository
      .createQueryBuilder()
      .delete()
      .from(Team)
      .where('id = :id', { id })
      .returning(['id', 'title', 'description', 'skills', 'created_at'])
      .execute();

    return returns.raw[0];
  }
}
