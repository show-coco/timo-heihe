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
import { Room } from '../../room/entities/room.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id?: number;

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

  @OneToMany(() => Room, (room) => room.team)
  rooms: Room[];

  @Column({ default: true })
  recruiting: boolean;
}
