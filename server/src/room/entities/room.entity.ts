import { Team } from '../../teams/entities/teams.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Thread } from 'src/thread/entities/thread.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Team, (team) => team.rooms)
  team: Team;

  @OneToMany(() => Thread, (thread) => thread.room, { nullable: true })
  threads?: Thread[];
}
