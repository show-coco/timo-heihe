import { Skill } from 'src/skill/entities/skill.entity';
import { Team } from 'src/teams/entities/teams.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  introduction: string;

  @Column({ nullable: true })
  githubId: string;

  @Column({ nullable: true })
  twitterId: string;

  @OneToMany(() => Team, (team) => team.owner, { nullable: true })
  ownerTeams?: Team[];

  @ManyToMany(() => Team, (team) => team.members, { nullable: true })
  teams?: Team[];

  @ManyToMany(() => Skill, (skill) => skill.users, { nullable: true })
  @JoinTable()
  skills?: Skill[];
}
