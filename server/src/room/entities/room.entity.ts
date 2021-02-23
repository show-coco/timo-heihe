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
import { RoomMembersUser } from '../../room-members-user/entities/room-members-user.entity';
import { Channel } from '../../channel/entities/channel.entity';
import { TeamType } from '../../room-type/entities/team-type.entity';

@Entity()
export class Room {
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

  @ManyToMany(() => Skill, (skill) => skill.rooms, { nullable: true })
  @JoinTable()
  skills: Skill[];

  @ManyToOne(() => User, (user) => user.ownerRooms)
  owner: Partial<User>;

  @OneToMany(() => RoomMembersUser, (rmu) => rmu.room)
  members?: RoomMembersUser[];

  @ManyToMany(() => Category, (category) => category.rooms)
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

  @OneToMany(() => Channel, (room) => room.room)
  rooms: Channel[];

  @Column({ default: true })
  recruiting: boolean;

  @ManyToMany(() => TeamType, (teamType) => teamType.room)
  @JoinTable()
  types: TeamType[];
}
