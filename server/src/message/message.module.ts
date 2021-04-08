import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { provideKeys } from '../constants';
import { PubSub } from 'apollo-server-express';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UsersModule],
  providers: [
    MessageResolver,
    MessageService,
    {
      provide: provideKeys.PUB_SUB,
      useValue: new PubSub(),
    },
  ],
})
export class MessageModule {}
