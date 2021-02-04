import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTeamMembersUserInput } from './dto/update-team-members-user.input';
import {
  MemberState,
  TeamMembersUser,
} from './entities/team-members-user.entity';

@Injectable()
export class TeamMembersUserService {
  constructor(
    @InjectRepository(TeamMembersUser)
    private teamRepository: Repository<TeamMembersUser>,
  ) {}

  create(teamId: number, userId: number, memberState: MemberState) {
    this.teamRepository.insert({
      user: { id: userId },
      team: { id: teamId },
      memberState: memberState,
    });
  }

  findAll() {
    return `This action returns all teamMembersUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamMembersUser`;
  }

  remove(teamId: number, userId: number) {
    this.teamRepository.delete({
      user: { id: userId },
      team: { id: teamId },
    });
  }

  update(id: number, input: UpdateTeamMembersUserInput) {
    return `This action removes a #${id} teamMembersUser`;
  }
}
