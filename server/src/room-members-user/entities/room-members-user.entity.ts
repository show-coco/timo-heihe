import { Room } from '../../room/entities/room.entity';
import { User } from '../../users/entities/users.entity';
import { CreateDateColumn, Entity, ManyToOne, Column } from 'typeorm';

export enum MemberState {
  PENDING = 'pending',
  JOINING = 'joining',
  EJECTED = 'ejected',
  LEAVE = 'leave',
}

@Entity()
export class RoomMembersUser {
  @ManyToOne(() => User, (user) => user.rooms, { primary: true })
  user: User;

  @ManyToOne(() => Room, (room) => room.members, { primary: true })
  room: Room;

  @Column({
    type: 'enum',
    enum: MemberState,
    default: MemberState.JOINING,
  })
  memberState: MemberState;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;
}
