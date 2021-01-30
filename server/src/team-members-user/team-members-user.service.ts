import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTeamMembersUserInput } from './dto/update-team-members-user.input';
import { TeamMembersUser } from './entities/team-members-user.entity';

@Injectable()
export class TeamMembersUserService {
  constructor(
    @InjectRepository(TeamMembersUser)
    private teamRepository: Repository<TeamMembersUser>,
  ) {}

  create(teamId: number, userId: string) {
    this.teamRepository.insert({ user: { id: userId }, team: { id: teamId } });
  }

  findAll() {
    return `This action returns all teamMembersUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamMembersUser`;
  }

  update(id: number, updateTeamMembersUserInput: UpdateTeamMembersUserInput) {
    return `This action updates a #${id} teamMembersUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamMembersUser`;
  }
}
