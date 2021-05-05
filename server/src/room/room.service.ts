import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Room } from './entities/room.entity';
import { SearchRoomInput } from './dto/search-room.input';
import { MyRoomsInput } from './dto/my-rooms.input';
import { RoomApplyingUserService } from '../room-applying-user/room-applying-user.service';
import { State } from 'src/room-applying-user/entities/room-applying-user.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private roomApplyingUserService: RoomApplyingUserService,
  ) {}

  async findOne(id: number): Promise<Room> {
    const res = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.categories', 'categories')
      .leftJoinAndSelect('room.owner', 'owner')
      .leftJoinAndSelect('room.skills', 'skills')
      .leftJoinAndSelect('room.types', 'types')
      .leftJoinAndSelect('room.recruitmentLevels', 'recruitmentLevels')
      .leftJoinAndSelect('room.applyingUsers', 'applyingUsers')
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
      .leftJoinAndSelect('room.recruitmentLevels', 'recruitmentLevels')
      .leftJoinAndSelect('room.applyingUsers', 'applyingUsers')
      .leftJoinAndSelect('applyingUsers.user', 'user')
      .where({ slug })
      .getOne();

    res.applyingUsers = res.applyingUsers.filter((user) => user.user);

    console.log('response on rooms->service->findOneBySlug', res);
    return res;
  }

  async findAll(searchRoomInput?: SearchRoomInput): Promise<Room[]> {
    const input: SearchRoomInput =
      searchRoomInput && JSON.parse(JSON.stringify(searchRoomInput));
    console.log('paramater on rooms->service->findAll', input);

    const query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.skills', 'skills')
      .leftJoinAndSelect('room.categories', 'categories')
      .leftJoinAndSelect('room.owner', 'owner')
      .leftJoinAndSelect('room.types', 'types')
      .leftJoinAndSelect('room.recruitmentLevels', 'recruitmentLevels')
      .leftJoinAndSelect('room.applyingUsers', 'applyingUsers');

    if (input.withApplication != null) {
      query.where('room.withApplication = :withApplication', {
        withApplication: input.withApplication,
      });
    }

    if (input?.keyword) {
      query.andWhere(
        'room.title ILIKE :keyword OR room.name ILIKE :keyword OR room.slug ILIKE :keyword',
        {
          keyword: `%${input.keyword}%`,
        },
      );
    }

    if (input?.skillIds) {
      query.andWhere('skills.id IN (:...ids)', {
        ids: input.skillIds,
      });
    }

    if (input?.categoryIds) {
      query.andWhere('categories.id IN (:...ids)', { ids: input.categoryIds });
    }

    if (input?.typeId) {
      query.andWhere('types.id = :id', { id: input.typeId });
    }

    if (input?.recruitmentLevelIds) {
      query.andWhere('recruitmentLevels.id IN (:...ids)', {
        ids: input.recruitmentLevelIds,
      });
    }

    const res = await query.getMany();

    console.log('res on rooms->service->findAll', res);
    return res;
  }

  async findAllByUserId(userId: number, input: MyRoomsInput) {
    const query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.applyingUsers', 'applyingUsers')
      .leftJoinAndSelect('applyingUsers.user', 'user')
      .where('user.id = :id', { id: userId });

    if (input.iAmOwner) {
      query
        .leftJoinAndSelect('room.owner', 'owner')
        .where('owner.id = :id', { id: userId });
    }

    if (input.state) {
      query.andWhere('applyingUsers.state = :state', { state: input.state });
    }

    const result = await query.getMany();

    const res: Room[] = result.map((room) => ({
      ...room,
      applyingUsers: room.applyingUsers.filter((user) =>
        user.user ? user.user : null,
      ),
    }));

    console.log('response on rooms->service->findAllByUserId', res);
    return res;
  }

  async findOpponents(userId: number) {
    const result = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.applyingUsers', 'applyingUsers')
      .leftJoinAndSelect('applyingUsers.user', 'user')
      .leftJoinAndSelect('room.owner', 'owner')
      .where('user.id = :id OR owner.id = :id', { id: userId })
      .andWhere('applyingUsers.state = :state', { state: State.APPROVED })
      .getMany();

    const res: Room[] = result.map((room) => ({
      ...room,
      applyingUsers: room.applyingUsers.filter((user) =>
        user.user ? user.user : null,
      ),
    }));

    console.log('response on room->service->findOpponent', res);
    return res;
  }

  async update(updateRoomInput: UpdateRoomInput): Promise<Room> {
    const input: UpdateRoomInput = JSON.parse(JSON.stringify(updateRoomInput));

    console.log('paramater on rooms->service->update', input);

    const formattedInput = {
      ...input,
      owner: { id: input.owner },
      recruitmentLevels: input.recruiementLevels.map((id) => ({ id })),
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
      recruitmentLevels: input.recruiementLevels.map((id) => ({ id })),
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

  async apply(userId: number, roomId: number): Promise<Room> {
    this.roomApplyingUserService.apply(userId, roomId);

    const res = await this.findOne(roomId);
    console.log('response on rooms->service->apply', res);
    return res;
  }

  async rejectApplication(userId: number, roomId: number) {
    this.roomApplyingUserService.reject(userId, roomId);

    const res = await this.findOne(roomId);
    console.log('response on rooms->service->rejectApplication', res);
    return res;
  }

  async acceptApplication(userId: number, roomId: number) {
    this.roomApplyingUserService.accept(userId, roomId);

    const res = await this.findOne(roomId);
    console.log('response on rooms->service->acceptApplication', res);
    return res;
  }

  async remove(id: number): Promise<{ affected?: number }> {
    const returns = await this.roomRepository.delete({ id });

    const res = returns;
    console.log('response on rooms->service->remove', res);
    return res;
  }
}
