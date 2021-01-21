import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  icon: string;

  @Column()
  description: string;

  @Column()
  skills: string;

  @ManyToOne(() => User, (user) => user.teams)
  owner: User;

  @ManyToMany(() => User)
  @JoinTable()
  members?: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;
}
