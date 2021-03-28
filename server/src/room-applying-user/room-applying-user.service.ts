import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomApplyingUser, State } from './entities/room-applying-user.entity';

@Injectable()
export class RoomApplyingUserService {
  constructor(
    @InjectRepository(RoomApplyingUser)
    private roomApplyingUserRepository: Repository<RoomApplyingUser>,
  ) {}

  update(userId: number, roomId: number, state: State) {
    const application = this.roomApplyingUserRepository.create({
      user: { id: userId },
      room: {
        id: roomId,
      },
      state,
    });

    this.roomApplyingUserRepository.save(application);
  }

  apply(userId: number, roomId: number) {
    this.update(userId, roomId, State.APPLYING);
  }

  reject(userId: number, roomId: number) {
    this.update(userId, roomId, State.REJECTED);
  }

  accept(userId: number, roomId: number) {
    this.update(userId, roomId, State.APPROVED);
  }
}
