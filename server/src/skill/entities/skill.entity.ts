import { Room } from '../../room/entities/room.entity';
import { User } from '../../users/entities/users.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @ManyToMany(() => Room, (room) => room.skills)
  rooms: Room[];

  @ManyToMany(() => User, (user) => user.skills)
  users: User[];
}
