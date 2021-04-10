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
import { Message } from '../../message/entities/message.entity';
import { RoomApplyingUser } from '../../room-applying-user/entities/room-applying-user.entity';

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

  @ManyToMany(() => Skill, (skill) => skill.users, { nullable: true })
  @JoinTable()
  skills?: Skill[];

  @OneToMany(() => Message, (message) => message.receiver, { nullable: true })
  receivedMessages?: Message[];

  @OneToMany(() => Message, (message) => message.sender, { nullable: true })
  sendedMessages?: Message[];

  @OneToMany(() => RoomApplyingUser, (applyingRoom) => applyingRoom.user, {
    nullable: true,
  })
  applyingRooms?: RoomApplyingUser[];
}
