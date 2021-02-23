import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateRoomMembersUserInput } from './dto/update-room-members-user.input';
import {
  MemberState,
  RoomMembersUser,
} from './entities/room-members-user.entity';

@Injectable()
export class RoomMembersUserService {
  constructor(
    @InjectRepository(RoomMembersUser)
    private roomMembersUserRepository: Repository<RoomMembersUser>,
  ) {}

  create(roomId: number, userId: number, memberState: MemberState) {
    this.roomMembersUserRepository.insert({
      user: { id: userId },
      room: { id: roomId },
      memberState: memberState,
    });
  }

  findAll() {
    return `This action returns all teamMembersUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teamMembersUser`;
  }

  remove(roomId: number, userId: number) {
    this.roomMembersUserRepository.delete({
      user: { id: userId },
      room: { id: roomId },
    });
  }

  update(id: number, input: UpdateRoomMembersUserInput) {
    return `This action removes a #${id} teamMembersUser`;
  }
}
