import { Room } from '../../room/entities/room.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RecruitmentLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Room, (room) => room.recruitmentLevels)
  rooms: Room[];
}
