import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { MessageService } from './message.service';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { MessageModel } from './models/message.model';
import { provideKeys, subscriptionKeys } from '../constants';
import { PubSubEngine } from 'apollo-server-express';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { CurrentUser } from 'src/users/dto/current-user';
import { Payload } from 'src/auth/types/payload';
import { FetchMessageInput } from './dto/fetch-message.input';

@Resolver(() => MessageModel)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    @Inject(provideKeys.PUB_SUB) private pubSub: PubSubEngine,
  ) {}

  @Query(() => MessageModel)
  message(@Args('id', { type: () => Int }) id: number) {
    return this.messageService.findOne(id);
  }

  @Query(() => [MessageModel])
  @UseGuards(GqlJwtAuthGuard)
  messages(
    @CurrentUser() user: Payload,
    @Args('input') input: FetchMessageInput,
  ) {
    return this.messageService.findAll(user.sub, input);
  }

  @Mutation(() => MessageModel)
  @UseGuards(GqlJwtAuthGuard)
  async createMessage(
    @CurrentUser() user: Payload,
    @Args('input') createMessageInput: CreateMessageInput,
  ) {
    const newMessage = await this.messageService.create(
      user.sub,
      createMessageInput,
    );
    this.pubSub.publish(subscriptionKeys.MESSAGE_ADDED, {
      messageAdded: newMessage,
    });

    console.log('response on message->resolver->createMessage', newMessage);
    return newMessage;
  }

  @Mutation(() => MessageModel)
  updateMessage(@Args('input') updateMessageInput: UpdateMessageInput) {
    return this.messageService.update(updateMessageInput);
  }

  // @Mutation(() => ChannelResponse)
  // removeMessage(@Args('id', { type: () => Int }) id: number) {
  //   return this.messageService.remove(id);
  // }

  @Subscription(() => MessageModel, {
    filter: (payload, variables) =>
      payload.messageAdded.receiver.userId === variables.slug,
  })
  messageAdded(@Args('slug') slug: string) {
    const addedMessage = this.pubSub.asyncIterator(
      subscriptionKeys.MESSAGE_ADDED,
    );

    console.log('response on message->resolver->addedMessage', addedMessage);
    return addedMessage;
  }
}
