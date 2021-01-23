import { Team } from 'src/teams/entities/teams.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @ManyToMany(() => Team, (team) => team.skills)
  teams: Team[];
}
