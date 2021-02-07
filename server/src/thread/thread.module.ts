import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadResolver } from './thread.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './entities/thread.entity';
import { PubSub } from 'apollo-server-express';
import { provideKeys } from '../constants';

@Module({
  imports: [TypeOrmModule.forFeature([Thread])],
  providers: [
    ThreadResolver,
    ThreadService,
    {
      provide: provideKeys.PUB_SUB,
      useValue: new PubSub(),
    },
  ],
})
export class ThreadModule {}
