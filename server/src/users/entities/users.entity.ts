import { Skill } from '../../skill/entities/skill.entity';
import { Team } from '../../teams/entities/teams.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamMembersUser } from '../../team-members-user/entities/team-members-user.entity';
import { Thread } from '../../thread/entities/thread.entity';
import { Message } from '../../message/entities/message.entity';
import { Channel } from '../../channel/entities/channel.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  userId: string;

  @Column({ unique: true })
  googleId: string;

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

  @OneToMany(() => Thread, (thread) => thread.user, { nullable: true })
  threads?: Thread[];

  @OneToMany(() => Message, (message) => message.user, { nullable: true })
  messages?: Message[];

  @OneToMany(() => Channel, (room) => room.user, { nullable: true })
  rooms?: Channel[];
}
