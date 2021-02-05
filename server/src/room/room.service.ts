import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  async findOne(id: number): Promise<Room> {
    const res = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.team', 'team.id = room.teamId')
      .where({ id })
      .getOne();

    console.log('response on room->service->findOne', res);

    return res;
  }

  async findAll(): Promise<Room[]> {
    const res = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.team', 'team.id = room.teamId')
      .getMany();

    console.log('response on room->service->findAll', res);

    return res;
  }
}
