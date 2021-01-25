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

  async findOne(id: string): Promise<User | undefined> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.skills', 'skills')
      .leftJoinAndSelect('user.teams', 'teams')
      .where({ id })
      .getOne();
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
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

    return this.userRepository.save(input);
  }
}
