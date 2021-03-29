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
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
import { RoomTypeModule } from './room-type/room-type.module';
import { RoomType } from './room-type/entities/room-type.entity';
import { RecruitmentLevelModule } from './recruitment-level/recruitment-level.module';
import { RecruitmentLevel } from './recruitment-level/entities/recruitment-level.entity';
import { RoomApplyingUser } from './room-applying-user/entities/room-applying-user.entity';
import { RoomApplyingUserModule } from './room-applying-user/room-applying-user.module';

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
        MessageModule,
        RoomTypeModule,
        RecruitmentLevelModule,
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
        Message,
        RoomType,
        RecruitmentLevel,
        RoomApplyingUser,
      ],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    RoomModule,
    CategoryModule,
    SkillModule,
    MessageModule,
    RoomTypeModule,
    RecruitmentLevelModule,
    RoomApplyingUserModule,
  ],
})
export class AppModule {}
