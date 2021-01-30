import { Team } from 'src/teams/entities/teams.entity';
import { User } from 'src/users/entities/users.entity';
import { CreateDateColumn, Entity, ManyToOne, Column } from 'typeorm';

export enum MemberState {
  PENDING = 'pending',
  JOINING = 'joining',
  EJECTED = 'ejected',
  LEAVE = 'leave',
}

@Entity()
export class TeamMembersUser {
  @ManyToOne(() => User, (user) => user.teams, { primary: true })
  user: User;

  @ManyToOne(() => Team, (team) => team.members, { primary: true })
  team: Team;

  @Column({
    type: 'enum',
    enum: MemberState,
    default: MemberState.JOINING,
  })
  memberState: MemberState;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;
}
