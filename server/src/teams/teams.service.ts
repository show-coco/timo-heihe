import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team } from './entities/teams.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async findOne(id: number): Promise<any> {
    const res = await this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.members', 'members', 'members.teamId = team.id')
      .leftJoinAndSelect('members.user', 'user', 'members.userId = user.id')
      .leftJoinAndSelect('team.categories', 'categories')
      .leftJoinAndSelect('team.owner', 'owner')
      .leftJoinAndSelect('team.skills', 'skills')
      .where({ id: id })
      .getOne();

    // console.log('response on teams->service->findOne', res);

    return res;
  }

  async findAll() {
    return this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.members', 'members', 'members.teamId = team.id')
      .leftJoinAndSelect('members.user', 'user', 'members.userId = user.id')
      .leftJoinAndSelect('team.categories', 'categories')
      .leftJoinAndSelect('team.owner', 'owner')
      .leftJoinAndSelect('team.skills', 'skills')
      .getMany();
  }

  async update(id: number, updateTeamInput: UpdateTeamInput) {
    const input: UpdateTeamInput = JSON.parse(JSON.stringify(updateTeamInput));

    return await this.teamRepository.save(input);
  }

  async insert(createTeamInput: CreateTeamInput) {
    const input: CreateTeamInput = JSON.parse(JSON.stringify(createTeamInput));

    console.log('paramater on teams->service->insert', createTeamInput);

    try {
      const returns = await this.teamRepository.save(input);
      return returns;
    } catch (e) {
      console.log(e);
    }
  }

  async join(userId: string, teamId: number) {
    const targetTeam = await this.findOne(teamId);
    const userExistsInThisTeam = targetTeam.members.some(
      (member) => member.user.id === userId,
    );

    if (userExistsInThisTeam) {
      throw new Error('user already exists in this team');
    }

    targetTeam.members.push({
      team: {
        id: teamId,
        title: '',
        description: '',
        icon: '',
        skills: [],
        owner: { id: '' },
        categories: [],
        recruitNumbers: 1,
        isRequired: false,
      },
      user: { id: userId, name: '', email: '' },
    });
    return this.teamRepository.save(targetTeam);
  }

  async leave(userId: string, teamId: number) {
    const targetTeam = await this.findOne(teamId);
    const userNotExistsInThisTeam = !targetTeam.members.some(
      (member) => member.user.id === userId,
    );

    if (userNotExistsInThisTeam) {
      throw new Error('user does not exsts in this team');
    }

    const newMembers = targetTeam.members.filter(
      (member) => member.user.id !== userId,
    );

    return this.teamRepository.save({
      ...targetTeam,
      members: newMembers,
    });
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
