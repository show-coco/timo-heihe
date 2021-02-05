import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ThreadService } from './thread.service';
import { CreateThreadInput } from './dto/create-thread.input';
import { UpdateThreadInput } from './dto/update-thread.input';
import { ThreadModel } from './models/thread.model';

@Resolver(() => ThreadModel)
export class ThreadResolver {
  constructor(private readonly threadService: ThreadService) {}

  @Mutation(() => ThreadModel)
  createThread(@Args('input') createThreadInput: CreateThreadInput) {
    return this.threadService.create(createThreadInput);
  }

  @Query(() => [ThreadModel], { name: 'thread' })
  findAll() {
    return this.threadService.findAll();
  }

  @Query(() => ThreadModel, { name: 'thread' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.threadService.findOne(id);
  }

  @Mutation(() => ThreadModel)
  updateThread(@Args('input') updateThreadInput: UpdateThreadInput) {
    return this.threadService.update(updateThreadInput.id, updateThreadInput);
  }

  @Mutation(() => ThreadModel)
  removeThread(@Args('id', { type: () => Int }) id: number) {
    return this.threadService.remove(id);
  }
}
