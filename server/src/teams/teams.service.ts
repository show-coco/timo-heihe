import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberState } from 'src/team-members-user/entities/team-members-user.entity';
import { TeamMembersUserService } from 'src/team-members-user/team-members-user.service';
import { Repository } from 'typeorm';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team } from './entities/teams.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    private teamMembersUserService: TeamMembersUserService,
  ) {}

  async findOne(id: number): Promise<Team> {
    const res = await this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.members', 'members', 'members.teamId = team.id')
      .leftJoinAndSelect('members.user', 'user', 'members.userId = user.id')
      .leftJoinAndSelect('team.categories', 'categories')
      .leftJoinAndSelect('team.owner', 'owner')
      .leftJoinAndSelect('team.skills', 'skills')
      .where({ id: id })
      .getOne();

    console.log('response on teams->service->findOne', res);

    return res;
  }

  async findAll(): Promise<Team[]> {
    const res = await this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.members', 'members', 'members.teamId = team.id')
      .leftJoinAndSelect('members.user', 'user', 'members.userId = user.id')
      .leftJoinAndSelect('team.categories', 'categories')
      .leftJoinAndSelect('team.owner', 'owner')
      .leftJoinAndSelect('team.skills', 'skills')
      .getMany();

    console.log('res on teams->service->findAll', res);

    return res;
  }

  async update(updateTeamInput: UpdateTeamInput) {
    const input: UpdateTeamInput = JSON.parse(JSON.stringify(updateTeamInput));

    const returns = await this.teamRepository.save(input);
    const res = this.findOne(returns.id);

    console.log('response on teams->service->update', res);

    return res;
  }

  async insert(createTeamInput: CreateTeamInput) {
    const input: CreateTeamInput = JSON.parse(JSON.stringify(createTeamInput));

    console.log('paramater on teams->service->insert', input);

    const returns = await this.teamRepository
      .createQueryBuilder()
      .insert()
      .values(input)
      .returning(['id', 'title'])
      .execute();

    const teamId = returns.raw[0].id;
    input.members.forEach((member) =>
      this.teamMembersUserService.create(
        teamId,
        member.user.id,
        MemberState.JOINING,
      ),
    );

    const res = this.findOne(teamId);

    console.log('response on teams->setvice->insert', res);

    return res;
  }

  async join(userId: number, teamId: number) {
    const targetTeam = await this.findOne(teamId);
    const userExistsInThisTeam = targetTeam.members.some(
      (member) => member.user.id === userId,
    );

    if (userExistsInThisTeam) {
      throw new Error('user already exists in this team');
    }

    return this.teamMembersUserService.create(
      teamId,
      userId,
      MemberState.JOINING,
    );
  }

  async apply(userId: number, teamId: number) {
    const targetTeam = await this.findOne(teamId);
    const userApplyingToThisTeam = targetTeam.members.some(
      (member) =>
        member.user.id === userId && member.memberState === MemberState.PENDING,
    );

    if (userApplyingToThisTeam) {
      throw new Error('user is already applying to this team');
    }

    return this.teamMembersUserService.create(
      teamId,
      userId,
      MemberState.PENDING,
    );
  }

  async leave(userId: string, teamId: number) {
    const targetTeam = await this.findOne(teamId);
    const userNotExistsInThisTeam = !targetTeam.members.some(
      (member) => member.user.userId === userId,
    );

    if (userNotExistsInThisTeam) {
      throw new Error('user does not exsts in this team');
    }

    return this.teamMembersUserService.remove(teamId, userId);
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
