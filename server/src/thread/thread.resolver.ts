import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ThreadService } from './thread.service';
import { CreateThreadInput } from './dto/create-thread.input';
import { UpdateThreadInput } from './dto/update-thread.input';
import { ThreadModel } from './models/thread.model';

@Resolver(() => ThreadModel)
export class ThreadResolver {
  constructor(private readonly threadService: ThreadService) {}

  @Query(() => ThreadModel)
  thread(@Args('id', { type: () => Int }) id: number) {
    return this.threadService.findOne(id);
  }

  @Query(() => [ThreadModel])
  threads() {
    return this.threadService.findAll();
  }

  @Mutation(() => ThreadModel)
  createThread(@Args('input') createThreadInput: CreateThreadInput) {
    return this.threadService.create(createThreadInput);
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
