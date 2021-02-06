import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { MessageModel } from './models/message.model';

@Resolver(() => MessageModel)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => MessageModel)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    return this.messageService.create(createMessageInput);
  }

  @Query(() => [MessageModel], { name: 'message' })
  findAll() {
    return this.messageService.findAll();
  }

  @Query(() => MessageModel, { name: 'message' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.messageService.findOne(id);
  }

  @Mutation(() => MessageModel)
  updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ) {
    return this.messageService.update(
      updateMessageInput.id,
      updateMessageInput,
    );
  }

  @Mutation(() => MessageModel)
  removeMessage(@Args('id', { type: () => Int }) id: number) {
    return this.messageService.remove(id);
  }
}
