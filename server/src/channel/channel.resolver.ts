import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TeamModel } from '../teams/models/team.model';
import { TeamsService } from '../teams/teams.service';
import { CreateChannelInput } from './dto/create-channel.input';
import { Channel } from './entities/channel.entity';
import { ChannelResponse } from './models/delete-channel';
import { ChannelModel } from './models/channel.model';
import { ChannelService } from './channel.service';

@Resolver(() => ChannelModel)
export class ChannelResolver {
  constructor(
    private channelService: ChannelService,
    private teamService: TeamsService,
  ) {}

  @Query(() => ChannelModel)
  channel(@Args('id', { type: () => Int }) id: number) {
    return this.channelService.findOne(id);
  }

  @Query(() => [ChannelModel])
  channels() {
    return this.channelService.findAll();
  }

  @Mutation(() => ChannelModel)
  createChannel(@Args('input') input: CreateChannelInput) {
    return this.channelService.create(input);
  }

  @Mutation(() => ChannelResponse)
  deleteChannel(@Args('id', { type: () => Int }) id: number) {
    return this.channelService.delete(id);
  }

  @ResolveField(() => TeamModel)
  team(@Parent() channel: Channel) {
    const res = this.teamService.findOne(channel.team.id);

    console.log('response on channel->resolver->team', res);
    return res;
  }
}
