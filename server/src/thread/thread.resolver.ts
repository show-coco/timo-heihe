import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { ThreadService } from './thread.service';
import { CreateThreadInput } from './dto/create-thread.input';
import { UpdateThreadInput } from './dto/update-thread.input';
import { ThreadModel } from './models/thread.model';
import { Inject } from '@nestjs/common';
import { PubSubEngine } from 'apollo-server-express';
import { provideKeys, subscriptionKeys } from '../constants';
import { FetchThreadInput } from './dto/fetch-thread.input';

@Resolver(() => ThreadModel)
export class ThreadResolver {
  constructor(
    private readonly threadService: ThreadService,
    @Inject(provideKeys.PUB_SUB) private pubSub: PubSubEngine,
  ) {}

  @Query(() => ThreadModel)
  async thread(@Args('id', { type: () => Int }) id: number) {
    const thread = await this.threadService.findOne(id);

    return {
      ...thread,
      numberOfMessages: thread.messages.length,
    };
  }

  @Query(() => [ThreadModel], { nullable: true })
  async threads(@Args('input') input: FetchThreadInput) {
    const threads = await this.threadService.findAll(input);

    return threads.map((thread) => ({
      ...thread,
      numberOfMessages: thread.messages.length,
    }));
  }

  @Mutation(() => ThreadModel)
  async createThread(@Args('input') createThreadInput: CreateThreadInput) {
    const newThread = await this.threadService.create(createThreadInput);
    const formattedThread = {
      ...newThread,
      numberOfMessages: newThread.messages.length,
    };
    this.pubSub.publish(subscriptionKeys.THREAD_ADDED, {
      threadAdded: formattedThread,
    });

    console.log('response on thread->resolver->createThread', formattedThread);
    return formattedThread;
  }

  @Mutation(() => ThreadModel)
  updateThread(@Args('input') updateThreadInput: UpdateThreadInput) {
    return this.threadService.update(updateThreadInput);
  }

  @Mutation(() => ThreadModel)
  removeThread(@Args('id', { type: () => Int }) id: number) {
    return this.threadService.remove(id);
  }

  @Subscription(() => ThreadModel, {
    filter: (payload, variables) =>
      payload.threadAdded.room.id === variables.roomId,
  })
  threadAdded(@Args('roomId', { type: () => Int }) roomId: number) {
    const addedThread = this.pubSub.asyncIterator(
      subscriptionKeys.THREAD_ADDED,
    );

    console.log('response on thread->resolver->threadAdded', addedThread);
    return addedThread;
  }
}
