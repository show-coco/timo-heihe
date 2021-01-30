import { Skill } from '../../skill/entities/skill.entity';
import { Team } from '../../teams/entities/teams.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { TeamMembersUser } from 'src/team-members-user/entities/team-members-user.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  introduction?: string;

  @Column({ nullable: true })
  githubId?: string;

  @Column({ nullable: true })
  twitterId?: string;

  @OneToMany(() => Team, (team) => team.owner, { nullable: true })
  ownerTeams?: Team[];

  @OneToMany(() => TeamMembersUser, (tmu) => tmu.user, {
    nullable: true,
  })
  teams?: TeamMembersUser[];

  @ManyToMany(() => Skill, (skill) => skill.users, { nullable: true })
  @JoinTable()
  skills?: Skill[];
}
