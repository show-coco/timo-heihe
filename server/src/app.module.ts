import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';
import { RoomModule } from './room/room.module';
import { CategoryModule } from './category/category.module';
import { SkillModule } from './skill/skill.module';
import { Room } from './room/entities/room.entity';
import { Category } from './category/entities/category.entity';
import { Skill } from './skill/entities/skill.entity';
import { RoomMembersUserModule } from './room-members-user/room-members-user.module';
import { RoomMembersUser } from './room-members-user/entities/room-members-user.entity';
import { Channel } from './channel/entities/channel.entity';
import { ThreadModule } from './thread/thread.module';
import { ChannelModule } from './channel/channel.module';
import { MessageModule } from './message/message.module';
import { Thread } from './thread/entities/thread.entity';
import { Message } from './message/entities/message.entity';
import { RoomTypeModule } from './room-type/room-type.module';
import { RoomType } from './room-type/entities/room-type.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
    }),
    GraphQLModule.forRoot({
      include: [
        UsersModule,
        RoomModule,
        CategoryModule,
        SkillModule,
        RoomMembersUserModule,
        ChannelModule,
        ThreadModule,
        MessageModule,
        RoomTypeModule,
      ],
      playground: true,
      autoSchemaFile: 'schema.graphql',
      sortSchema: true,
      context: ({ req }) => ({ headers: req && req.headers }),
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 6543,
      username: 'timoheihe',
      password: 'postgres',
      database: 'postgres',
      entities: [
        User,
        Room,
        Category,
        Skill,
        RoomMembersUser,
        Channel,
        Thread,
        Message,
        RoomType,
      ],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    RoomModule,
    CategoryModule,
    SkillModule,
    RoomMembersUserModule,
    ChannelModule,
    ThreadModule,
    MessageModule,
    RoomTypeModule,
  ],
})
export class AppModule {}
