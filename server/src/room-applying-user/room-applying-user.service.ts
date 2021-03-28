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

  apply(userId: number, roomId: number) {
    const application = this.roomApplyingUserRepository.create({
      user: { id: userId },
      room: {
        id: roomId,
      },
      state: State.APPLYING,
    });

    this.roomApplyingUserRepository.save(application);
  }

  reject(userId: number, roomId: number) {
    const application = this.roomApplyingUserRepository.create({
      user: { id: userId },
      room: {
        id: roomId,
      },
      state: State.REJECTED,
    });

    this.roomApplyingUserRepository.save(application);
  }
}
