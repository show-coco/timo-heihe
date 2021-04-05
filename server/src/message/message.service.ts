import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageInput } from './dto/create-message.input';
import { FetchMessageInput } from './dto/fetch-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async findOne(id: number): Promise<Message> {
    const res = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.thread', 'thread.id = message.threadId')
      .leftJoinAndSelect('message.user', 'user.id = message.userId')
      .where({ id })
      .getOne();

    console.log('response on message->service->findOne', res);
    return res;
  }

  async findAll(userId: number, input: FetchMessageInput) {
    console.log('cursorrrrr', input.cursor);
    const res = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.receiver', 'receiver')
      .where('receiver.id = :userId AND sender.userId = :opponentSlug', {
        userId,
        opponentSlug: input.opponentSlug,
      })
      .orWhere('receiver.userId = :opponentSlug AND sender.id = :userId', {
        opponentSlug: input.opponentSlug,
        userId,
      })
      .andWhere('message.createdAt < :date', { date: input.cursor })
      .limit(10)
      .orderBy('message.createdAt', 'DESC')
      .getMany();

    console.log('response on message->service->findAll', res);
    return res;
  }

  async create(createMessageInput: CreateMessageInput) {
    const input: CreateMessageInput = JSON.parse(
      JSON.stringify(createMessageInput),
    );
    console.log('paramater on message->service->create', input);

    const returns = await this.messageRepository.save(input);
    const res = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect(
        'message.thread',
        'thread',
        'thread.id = message.threadId',
      )
      .leftJoinAndSelect('thread.room', 'room', 'room.id = thread.roomId')
      .where({ id: returns.id })
      .getOne();

    console.log('response on message->service->create', res);
    return res;
  }

  async update(updateMessageInput: UpdateMessageInput) {
    const input: UpdateMessageInput = JSON.parse(
      JSON.stringify(updateMessageInput),
    );
    console.log('paramater on message->service->update', input);

    const res = await this.messageRepository.save(input);

    console.log('response on message->service->update', res);
    return res;
  }

  async remove(id: number): Promise<{ affected?: number }> {
    const res = await this.messageRepository.delete({ id });

    console.log('response on message->service->remove');
    return res;
  }
}
