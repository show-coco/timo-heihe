import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomInput } from './dto/create-room.input';
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

  async create(createRoomInput: CreateRoomInput): Promise<Room> {
    const input: CreateRoomInput = JSON.parse(JSON.stringify(createRoomInput));
    console.log('paramater on room->service->create', input);

    const res = await this.roomRepository.save(input);

    console.log('response on room->service->create', res);
    return res;
  }

  async delete(id: number): Promise<{ affected?: number }> {
    const res = await this.roomRepository.delete({ id });

    console.log('response on room->service->delete', res);
    return res;
  }
}
