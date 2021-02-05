import { Injectable } from '@nestjs/common';
import { CreateThreadInput } from './dto/create-thread.input';
import { UpdateThreadInput } from './dto/update-thread.input';

@Injectable()
export class ThreadService {
  create(createThreadInput: CreateThreadInput) {
    return 'This action adds a new thread';
  }

  findAll() {
    return `This action returns all thread`;
  }

  findOne(id: number) {
    return `This action returns a #${id} thread`;
  }

  update(id: number, updateThreadInput: UpdateThreadInput) {
    return `This action updates a #${id} thread`;
  }

  remove(id: number) {
    return `This action removes a #${id} thread`;
  }
}
