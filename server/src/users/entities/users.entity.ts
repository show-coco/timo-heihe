import { Skill } from '../../skill/entities/skill.entity';
import { Room } from '../../room/entities/room.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomMembersUser } from '../../room-members-user/entities/room-members-user.entity';
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

  @OneToMany(() => Room, (room) => room.owner, { nullable: true })
  ownerRooms?: Room[];

  @OneToMany(() => RoomMembersUser, (rmu) => rmu.user, {
    nullable: true,
  })
  rooms?: RoomMembersUser[];

  @ManyToMany(() => Skill, (skill) => skill.users, { nullable: true })
  @JoinTable()
  skills?: Skill[];

  @OneToMany(() => Thread, (thread) => thread.user, { nullable: true })
  threads?: Thread[];

  @OneToMany(() => Message, (message) => message.user, { nullable: true })
  messages?: Message[];

  @OneToMany(() => Channel, (room) => room.user, { nullable: true })
  channels?: Channel[];
}
