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
  UpdateDateColumn,
} from 'typeorm';
import { RoomType } from '../../room-type/entities/room-type.entity';
import { RecruitmentLevel } from '../../recruitment-level/entities/recruitment-level.entity';
import { RoomApplyingUser } from 'src/room-applying-user/entities/room-applying-user.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  invidationUrl?: string;

  @ManyToMany(() => Skill, (skill) => skill.rooms, { nullable: true })
  @JoinTable()
  skills: Skill[];

  @ManyToOne(() => User, (user) => user.ownerRooms)
  owner: Partial<User>;

  @ManyToMany(() => Category, (category) => category.rooms)
  @JoinTable()
  categories: Category[];

  @Column({ nullable: true })
  repositoryUrl?: string;

  @Column({ default: true })
  withApplication: boolean;

  @Column({ default: true })
  recruiting: boolean;

  @ManyToMany(() => RoomType, (roomType) => roomType.room)
  @JoinTable()
  types: RoomType[];

  @ManyToMany(() => RecruitmentLevel, (rl) => rl.rooms)
  @JoinTable()
  recruitmentLevels: RecruitmentLevel[];

  @OneToMany(() => RoomApplyingUser, (applyingUsers) => applyingUsers.room, {
    nullable: true,
  })
  applyingUsers?: RoomApplyingUser[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}
