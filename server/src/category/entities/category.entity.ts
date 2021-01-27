import { Team } from '../../teams/entities/teams.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @ManyToMany(() => Team, (team) => team.categories)
  teams: Team[];
}
