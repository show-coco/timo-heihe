import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  skills: string;

  @ManyToOne(() => User, (user) => user.teams)
  owner: User;

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
