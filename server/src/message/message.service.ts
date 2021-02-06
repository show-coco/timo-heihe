import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageInput } from './dto/create-message.input';
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

  async findAll() {
    const res = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.thread', 'thread.id = message.threadId')
      .leftJoinAndSelect('message.user', 'user.id = message.userId')
      .getMany();

    console.log('response on message->service->findAll', res);
    return res;
  }

  async create(createMessageInput: CreateMessageInput) {
    const input: CreateMessageInput = JSON.parse(
      JSON.stringify(createMessageInput),
    );
    console.log('paramater on message->service->create', input);

    const res = await this.messageRepository.save(input);

    console.log('response on message->service->create', res);
    return res;
  }

  update(id: number, updateMessageInput: UpdateMessageInput) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
