import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { CreateThreadInput } from './dto/create-thread.input';
import { FetchThreadInput } from './dto/fetch-thread.input';
import { UpdateThreadInput } from './dto/update-thread.input';
import { Thread } from './entities/thread.entity';

@Injectable()
export class ThreadService {
  constructor(
    @InjectRepository(Thread) private threadRepository: Repository<Thread>,
  ) {}

  async findAll(input: FetchThreadInput): Promise<Thread[]> {
    const res = await this.threadRepository
      .createQueryBuilder('thread')
      .leftJoinAndSelect('thread.user', 'user.id = thread.userId')
      .leftJoinAndSelect('thread.room', 'room.id = thread.roomId')
      .leftJoinAndSelect('thread.messages', 'messages.threadId = thread.id')
      .where({
        room: { id: input.roomId },
        createdAt: LessThanOrEqual(input.cursor),
      })
      .limit(10)
      .orderBy('thread.createdAt', 'DESC')
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

  async create(createThreadInput: CreateThreadInput): Promise<Thread> {
    const input: CreateThreadInput = JSON.parse(
      JSON.stringify(createThreadInput),
    );
    console.log('paramater on thread->service->create', input);

    const returns = await this.threadRepository.save(input);
    const thread = this.findOne(returns.id);

    console.log('response on thread->service->create', thread);
    return thread;
  }

  update(updateThreadInput: UpdateThreadInput): Promise<Thread> {
    const res = this.threadRepository.save(updateThreadInput);

    console.log('response on thread->service->update', res);
    return res;
  }

  remove(id: number) {
    return `This action removes a #${id} thread`;
  }
}
