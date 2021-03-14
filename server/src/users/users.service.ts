import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByGoogleId(googleId: string) {
    const res = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.skills', 'userSkills')
      .where({ googleId })
      .getOne();

    // console.log('response on users->service->findByGoogleId', res.rooms);

    return res;
  }

  async findById(id: number): Promise<User> {
    const res = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.skills', 'userSkills')
      .where({ id })
      .getOne();

    console.log('response on users->service->findById', res);

    return res;
  }

  async getUserSkillIds(userId: string): Promise<number[]> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.skills', 'skills')
      .where({ userId })
      .getOne();

    const skillIds = user.skills.map((skill) => skill.id);

    console.log('response on users->service->getUserSkills', skillIds);
    return skillIds;
  }

  async findOne(userId: string): Promise<User> {
    console.log('userId', userId);
    const res = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.skills', 'userSkills')
      .leftJoinAndSelect('user.rooms', 'rooms')
      .leftJoinAndSelect('rooms.room', 'room')
      .leftJoinAndSelect('room.members', 'members', 'members.roomId = room.id')
      .leftJoinAndSelect('room.owner', 'owner')
      .leftJoinAndSelect('room.skills', 'roomSkills')
      .where({ userId })
      .getOne();

    console.log('response on users->service->findOne', res);

    return res;
  }

  async findAll(): Promise<User[]> {
    const res = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.skills', 'skills')
      .leftJoinAndSelect('user.rooms', 'rooms')
      .leftJoinAndSelect('rooms.room', 'room')
      .leftJoinAndSelect('room.owner', 'owner')
      .leftJoinAndSelect('room.skills', 'roomSkills')
      .getMany();

    console.log('response on user->service->findAll', res);
    return res;
  }

  async save(user: User): Promise<User> {
    try {
      const newUser = await this.userRepository.save(user);
      return newUser;
    } catch (e) {
      console.log(e);
    }
  }

  async update(updateUserInput: UpdateUserInput) {
    const input: UpdateUserInput = JSON.parse(JSON.stringify(updateUserInput));

    const formattedInput = {
      ...input,
      skills: input.skills.map((id) => ({ id })),
    };

    return this.userRepository.save(formattedInput);
  }
}
