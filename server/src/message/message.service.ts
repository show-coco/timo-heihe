import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { LessThan, Repository } from 'typeorm';
import { CreateMessageInput } from './dto/create-message.input';
import { FetchMessageInput } from './dto/fetch-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private readonly usersService: UsersService,
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
    console.log('cursorrrrr', input.opponentSlug, userId);
    const opponent = await this.usersService.findOne(input.opponentSlug);
    const res = await this.messageRepository.find({
      relations: ['sender', 'receiver'],
      where: [
        {
          receiver: {
            id: userId,
          },
          sender: { id: opponent.id },
          createdAt: LessThan(input.cursor),
        },
        {
          receiver: {
            id: opponent.id,
          },
          sender: {
            id: userId,
          },
          createdAt: LessThan(input.cursor),
        },
      ],
      take: 10,
      order: { createdAt: 'DESC' },
    });

    console.log('response on message->service->findAll', res);
    return res;
  }

  async create(userId: number, createMessageInput: CreateMessageInput) {
    const input: CreateMessageInput = JSON.parse(
      JSON.stringify(createMessageInput),
    );
    console.log('paramater on message->service->create', input);
    const opponent = await this.usersService.findOne(input.opponentSlug);

    const message = this.messageRepository.create({
      ...input,
      sender: { id: userId },
      receiver: { id: opponent.id },
    });

    const returns = await this.messageRepository.save(message);
    const res = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.receiver', 'receiver')
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
