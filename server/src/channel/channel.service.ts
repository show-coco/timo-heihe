import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChannelInput } from './dto/create-channel.input';
import { Channel } from './entities/channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel) private channelRepository: Repository<Channel>,
  ) {}

  async findOne(id: number): Promise<Channel> {
    const res = await this.channelRepository
      .createQueryBuilder('channel')
      .leftJoinAndSelect('channel.team', 'team.id = channel.teamId')
      .where({ id })
      .getOne();

    console.log('response on channel->service->findOne', res);
    return res;
  }

  async findAll(): Promise<Channel[]> {
    const res = await this.channelRepository
      .createQueryBuilder('channel')
      .leftJoinAndSelect('channel.team', 'team.id = channel.teamId')
      .getMany();

    console.log('response on channel->service->findAll', res);
    return res;
  }

  async create(createChannelInput: CreateChannelInput): Promise<Channel> {
    const input: CreateChannelInput = JSON.parse(
      JSON.stringify(createChannelInput),
    );
    console.log('paramater on channel->service->create', input);

    const res = await this.channelRepository.save(input);

    console.log('response on channel->service->create', res);
    return res;
  }

  async delete(id: number): Promise<{ affected?: number }> {
    const res = await this.channelRepository.delete({ id });

    console.log('response on channel->service->delete', res);
    return res;
  }
}
