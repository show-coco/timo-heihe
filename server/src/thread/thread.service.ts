import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateThreadInput } from './dto/create-thread.input';
import { UpdateThreadInput } from './dto/update-thread.input';
import { Thread } from './entities/thread.entity';

@Injectable()
export class ThreadService {
  constructor(
    @InjectRepository(Thread) private threadRepository: Repository<Thread>,
  ) {}

  findAll(): Promise<Thread[]> {
    const res = this.threadRepository
      .createQueryBuilder('thread')
      .leftJoinAndSelect('thread.user', 'user.id = thread.userId')
      .leftJoinAndSelect('thread.room', 'room.id = thread.roomId')
      .getMany();

    console.log('response on thread->service->findAll', res);
    return res;
  }

  findOne(id: number) {
    const res = this.threadRepository
      .createQueryBuilder('thread')
      .leftJoinAndSelect('thread.user', 'user.id = thread.userId')
      .leftJoinAndSelect('thread.room', 'room.id = thread.roomId')
      .where({ id })
      .getOne();

    console.log('response on thread->service->findOne', res);
    return res;
  }

  create(createThreadInput: CreateThreadInput) {
    return 'This action adds a new thread';
  }

  update(id: number, updateThreadInput: UpdateThreadInput) {
    return `This action updates a #${id} thread`;
  }

  remove(id: number) {
    return `This action removes a #${id} thread`;
  }
}
