import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberState } from '../room-members-user/entities/room-members-user.entity';
import { RoomMembersUserService } from '../room-members-user/room-members-user.service';
import { Repository } from 'typeorm';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Room } from './entities/room.entity';
import { SearchRoomInput } from './dto/search-room.input';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private roomMembersUserService: RoomMembersUserService,
  ) {}

  async findOne(id: number): Promise<Room> {
    const res = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.members', 'members', 'members.roomId = room.id')
      .leftJoinAndSelect('members.user', 'user', 'members.userId = user.id')
      .leftJoinAndSelect('room.categories', 'categories')
      .leftJoinAndSelect('room.owner', 'owner')
      .leftJoinAndSelect('room.skills', 'skills')
      .leftJoinAndSelect('room.channels', 'channels.roomId = room.id')
      .leftJoinAndSelect('room.types', 'types')
      .where({ id: id })
      .getOne();

    console.log('response on rooms->service->findOne', res);
    return res;
  }

  async findAll(searchRoomInput?: SearchRoomInput): Promise<Room[]> {
    const input: SearchRoomInput | undefined =
      searchRoomInput && JSON.parse(JSON.stringify(searchRoomInput));
    console.log('paramater on rooms->service->findAll', input);

    const query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.members', 'members', 'members.roomId = room.id')
      .leftJoinAndSelect('members.user', 'user', 'members.userId = user.id')
      .leftJoinAndSelect('room.categories', 'categories')
      .leftJoinAndSelect('room.owner', 'owner')
      .leftJoinAndSelect('room.skills', 'skills')
      .leftJoinAndSelect('room.rooms', 'rooms.roomId = room.id')
      .leftJoinAndSelect('room.types', 'types')
      .where({ recruiting: true });

    if (input && input.name) {
      query.andWhere('room.title LIKE :name', { name: `%${input.name}%` });
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

    if (input && input.recruitNumbers) {
      query.andWhere(
        'room.recruitNumbers > :lower AND room.recruitNumbers < :upper',
        {
          lower: input.recruitNumbers - 5,
          upper: input.recruitNumbers + 5,
        },
      );
    }

    const res = await query.getMany();

    console.log('res on rooms->service->findAll', res);
    return res;
  }

  async update(updateRoomInput: UpdateRoomInput): Promise<Room> {
    const input: UpdateRoomInput = JSON.parse(JSON.stringify(updateRoomInput));

    console.log('paramater on rooms->service->update', input);

    const formattedInput = {
      ...input,
      types: input.typeIds.map((id) => ({ id })),
    };

    const newRoom = this.roomRepository.create(formattedInput);

    const returns = await this.roomRepository.save(newRoom);

    const res = await this.findOne(returns.id);
    console.log('response on rooms->service->update', res);
    return res;
  }

  async insert(createRoomInput: CreateRoomInput): Promise<Room> {
    const input: CreateRoomInput = JSON.parse(JSON.stringify(createRoomInput));

    console.log('paramater on rooms->service->insert', input);

    const formattedInput = {
      ...input,
      types: input.typeIds.map((id) => ({ id })),
    };

    const newRoom = this.roomRepository.create(formattedInput);

    const returns = await this.roomRepository.save(newRoom);

    const roomId = returns.id;
    input.members.forEach((member) =>
      this.roomMembersUserService.create(
        roomId,
        member.user.id,
        MemberState.JOINING,
      ),
    );

    const res = await this.findOne(roomId);
    console.log('response on rooms->setvice->insert', res);
    return res;
  }

  async join(userId: number, roomId: number): Promise<Room> {
    const targetRoom = await this.findOne(roomId);
    for (const member of targetRoom.members) {
      const exists = member.user.id === userId;
      if (exists && member.memberState === MemberState.JOINING) {
        throw new Error('User already exists in this room');
      }
    }

    const isLimitOfRecruit =
      targetRoom.members.length >= targetRoom.recruitNumbers;

    if (isLimitOfRecruit) {
      throw new Error(
        'The upper limit of the number of recruit has been reached.',
      );
    }

    await this.roomMembersUserService.create(
      roomId,
      userId,
      MemberState.JOINING,
    );

    const res = await this.findOne(roomId);
    console.log('response on rooms->service->join', res);
    return res;
  }

  async apply(userId: number, roomId: number): Promise<Room> {
    const targetRoom = await this.findOne(roomId);
    for (const member of targetRoom.members) {
      const exists = member.user.id === userId;
      if (exists && member.memberState === MemberState.JOINING) {
        throw new Error('User already exists in this room');
      }
      if (exists && member.memberState === MemberState.PENDING) {
        throw new Error('User has already applied to this room');
      }
    }

    await this.roomMembersUserService.create(
      roomId,
      userId,
      MemberState.PENDING,
    );

    const res = await this.findOne(roomId);
    console.log('response on rooms->service->apply', res);
    return res;
  }

  async leave(userId: number, roomId: number): Promise<Room> {
    const targetRoom = await this.findOne(roomId);
    const userNotExistsInThisRoom = !targetRoom.members.some(
      (member) => member.user.id === userId,
    );

    if (userNotExistsInThisRoom) {
      throw new Error('user does not exsts in this room');
    }

    await this.roomMembersUserService.remove(roomId, userId);

    const res = await this.findOne(roomId);
    console.log('response on rooms->service->leave', res);
    return res;
  }

  async remove(id: number): Promise<{ affected?: number }> {
    const returns = await this.roomRepository.delete({ id });

    const res = returns;
    console.log('response on rooms->service->remove', res);
    return res;
  }
}
