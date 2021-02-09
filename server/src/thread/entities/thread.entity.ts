import { Room } from '../../room/entities/room.entity';
import { User } from '../../users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from '../../message/entities/message.entity';

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @ManyToOne(() => Room, (room) => room.threads)
  room: Room;

  @ManyToOne(() => User, (user) => user.threads)
  user: User;

  @OneToMany(() => Message, (message) => message.thread, { nullable: true })
  messages?: Message[];
}
