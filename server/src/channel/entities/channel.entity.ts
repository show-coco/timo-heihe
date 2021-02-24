import { Room } from '../../room/entities/room.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Thread } from '../../thread/entities/thread.entity';
import { User } from '../../users/entities/users.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Room, (room) => room.channels)
  room: Room;

  @OneToMany(() => Thread, (thread) => thread.channel, { nullable: true })
  threads?: Thread[];

  @OneToMany(() => User, (user) => user.rooms)
  user: User;
}
