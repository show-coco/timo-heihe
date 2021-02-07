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

@Resolver(() => ThreadModel)
export class ThreadResolver {
  constructor(
    private readonly threadService: ThreadService,
    @Inject(provideKeys.PUB_SUB) private pubSub: PubSubEngine,
  ) {}

  @Query(() => ThreadModel)
  thread(@Args('id', { type: () => Int }) id: number) {
    return this.threadService.findOne(id);
  }

  @Query(() => [ThreadModel])
  threads() {
    return this.threadService.findAll();
  }

  @Mutation(() => ThreadModel)
  async createThread(@Args('input') createThreadInput: CreateThreadInput) {
    const newThread = await this.threadService.create(createThreadInput);
    this.pubSub.publish(subscriptionKeys.THREAD_ADDED, {
      threadAdded: newThread,
    });

    console.log('response on thread->resolver->createThread', newThread);
    return newThread;
  }

  @Mutation(() => ThreadModel)
  updateThread(@Args('input') updateThreadInput: UpdateThreadInput) {
    return this.threadService.update(updateThreadInput);
  }

  @Mutation(() => ThreadModel)
  removeThread(@Args('id', { type: () => Int }) id: number) {
    return this.threadService.remove(id);
  }

  @Subscription(() => ThreadModel)
  threadAdded() {
    const addedThread = this.pubSub.asyncIterator(
      subscriptionKeys.THREAD_ADDED,
    );

    console.log('response on thread->resolver->threadAdded', addedThread);
    return addedThread;
  }
}
