import { Category } from '../../category/entities/category.entity';
import { Skill } from '../../skill/entities/skill.entity';
import { User } from '../../users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamMembersUser } from '../../team-members-user/entities/team-members-user.entity';
import { Channel } from '../../channel/entities/channel.entity';
import { TeamType } from '../../team-type/entities/team-type.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Skill, (skill) => skill.teams, { nullable: true })
  @JoinTable()
  skills: Skill[];

  @ManyToOne(() => User, (user) => user.ownerTeams)
  owner: Partial<User>;

  @OneToMany(() => TeamMembersUser, (tmu) => tmu.team)
  members?: TeamMembersUser[];

  @ManyToMany(() => Category, (category) => category.teams)
  @JoinTable()
  categories: Category[];

  @Column({ nullable: true })
  repositoryUrl?: string;

  @Column({ nullable: true })
  recruitNumbers: number;

  @Column({ default: true })
  isRequired: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @OneToMany(() => Channel, (room) => room.team)
  rooms: Channel[];

  @Column({ default: true })
  recruiting: boolean;

  @ManyToMany(() => TeamType, (teamType) => teamType.team)
  @JoinTable()
  types: TeamType[];
}
