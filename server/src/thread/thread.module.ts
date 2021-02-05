import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadResolver } from './thread.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './entities/thread.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Thread])],
  providers: [ThreadResolver, ThreadService],
})
export class ThreadModule {}
