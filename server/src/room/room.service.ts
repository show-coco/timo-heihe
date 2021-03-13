import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Room } from './entities/room.entity';
import { SearchRoomInput } from './dto/search-room.input';
import { MyRoomsInput } from './dto/my-rooms.input';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async findOne(id: number): Promise<Room> {
    const res = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.categories', 'categories')
      .leftJoinAndSelect('room.owner', 'owner')
      .leftJoinAndSelect('room.skills', 'skills')
      .leftJoinAndSelect('room.types', 'types')
      .where({ id: id })
      .getOne();

    console.log('response on rooms->service->findOne', res);
    return res;
  }

  async findOneBySlug(slug: string): Promise<Room> {
    const res = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.skills', 'skills')
      .leftJoinAndSelect('room.categories', 'categories')
      .leftJoinAndSelect('room.owner', 'owner')
      .leftJoinAndSelect('room.types', 'types')
      .where({ slug })
      .getOne();

    console.log('response on rooms->service->findOneBySlug', res);
    return res;
  }

  async findAll(searchRoomInput?: SearchRoomInput): Promise<Room[]> {
    const input: SearchRoomInput | undefined =
      searchRoomInput && JSON.parse(JSON.stringify(searchRoomInput));
    console.log('paramater on rooms->service->findAll', input);

    const query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.skills', 'skills')
      .leftJoinAndSelect('room.categories', 'categories')
      .leftJoinAndSelect('room.owner', 'owner');

    if (input && input.title) {
      query.andWhere('room.title LIKE :title', { title: `%${input.title}%` });
    }

    if (input && input.skillIds) {
      query.andWhere('skills.id IN (:...ids)', {
        ids: input.skillIds,
      });
    }

    if (input && input.categoryIds) {
      query.andWhere('categories.id IN (:...ids)', { ids: input.categoryIds });
    }

    if (input && input.typeId) {
      query.andWhere('types.id = :id', { id: input.typeId });
    }

    const res = await query.getMany();

    console.log('res on rooms->service->findAll', res);
    return res;
  }

  async findAllByUserId(userId: number, input: MyRoomsInput) {
    const query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.members', 'members', 'members.roomId = room.id')
      .leftJoinAndSelect('members.user', 'user', 'members.userId = user.id')
      .where('user.id = :id', { id: userId });

    if (input.iAmOwner) {
      query
        .leftJoinAndSelect('room.owner', 'owner')
        .where('owner.id = :id', { id: userId });
    }

    const res = await query.getMany();

    console.log('response on rooms->service->findAllByUserId', res);

    return res;
  }

  async update(updateRoomInput: UpdateRoomInput): Promise<Room> {
    const input: UpdateRoomInput = JSON.parse(JSON.stringify(updateRoomInput));

    console.log('paramater on rooms->service->update', input);

    const formattedInput = {
      ...input,
      owner: { id: input.owner },
      skills: input.skills && input.skills.map((id) => ({ id })),
      categories: input.categories && input.categories.map((id) => ({ id })),
      types: input.typeIds && input.typeIds.map((id) => ({ id })),
    };

    const returns = await this.roomRepository.save(formattedInput);

    const res = await this.findOne(returns.id);
    console.log('response on rooms->service->update', res);
    return res;
  }

  async insert(createRoomInput: CreateRoomInput): Promise<Room> {
    const input: CreateRoomInput = JSON.parse(JSON.stringify(createRoomInput));

    console.log('paramater on rooms->service->insert', input);

    const formattedInput = {
      ...input,
      owner: { id: input.owner },
      skills: input.skills.map((id) => ({ id })),
      categories: input.categories.map((id) => ({ id })),
      types: input.typeIds.map((id) => ({ id })),
    };

    const returns = await this.roomRepository.save(formattedInput);

    const roomId = returns.id;

    const res = await this.findOne(roomId);
    console.log('response on rooms->setvice->insert', res);
    return res;
  }

  // async apply(userId: number, roomId: number): Promise<Room> {
  //   const targetRoom = await this.findOne(roomId);
  //   for (const member of targetRoom.members) {
  //     const exists = member.user.id === userId;
  //     if (exists && member.memberState === MemberState.JOINING) {
  //       throw new Error('User already exists in this room');
  //     }
  //     if (exists && member.memberState === MemberState.PENDING) {
  //       throw new Error('User has already applied to this room');
  //     }
  //   }

  //   await this.roomMembersUserService.create(
  //     roomId,
  //     userId,
  //     MemberState.PENDING,
  //   );

  //   const res = await this.findOne(roomId);
  //   console.log('response on rooms->service->apply', res);
  //   return res;
  // }

  async remove(id: number): Promise<{ affected?: number }> {
    const returns = await this.roomRepository.delete({ id });

    const res = returns;
    console.log('response on rooms->service->remove', res);
    return res;
  }
}
