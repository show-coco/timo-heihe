import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/users/entities/users.entity';
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

  @ManyToMany(() => Category, (category) => category.teams)
  @JoinTable()
  categories: Category[];

  @Column({ nullable: true })
  repositoryUrl?: string;

  @Column()
  recruitNumbers: number;

  @Column({ nullable: true })
  isRequired: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;
}
