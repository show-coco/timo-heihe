import { Team } from 'src/teams/entities/teams.entity';
import { User } from 'src/users/entities/users.entity';
import { CreateDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity()
export class TeamMembersUser {
  @ManyToOne(() => User, (user) => user.teams, { primary: true })
  user: User;

  @ManyToOne(() => Team, (team) => team.members, { primary: true })
  team: Team;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;
}
