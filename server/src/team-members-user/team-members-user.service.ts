import { Injectable } from '@nestjs/common';
import { CreateTeamMembersUserInput } from './dto/create-team-members-user.input';
import { UpdateTeamMembersUserInput } from './dto/update-team-members-user.input';

@Injectable()
export class TeamMembersUserService {
  create(createTeamMembersUserInput: CreateTeamMembersUserInput) {
    return 'This action adds a new teamMembersUser';
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
