import { Room } from '../../room/entities/room.entity';
import { User } from '../../users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

export enum State {
  APPLYING = 'applying',
  REJECTED = 'rejected',
  APPROVED = 'approved',
}

@Entity()
export class RoomApplyingUser {
  @ManyToOne(() => User, (user) => user.applyingRooms, { primary: true })
  user: User;

  @ManyToOne(() => Room, (room) => room.applyingUsers, { primary: true })
  room: Room;

  @Column({
    type: 'enum',
    enum: State,
    default: State.APPLYING,
  })
  state: State;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}
