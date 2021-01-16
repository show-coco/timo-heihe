import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
    }),
    GraphQLModule.forRoot({
      include: [UsersModule],
      playground: true,
      autoSchemaFile: 'schema.graphql',
      sortSchema: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'timoheihe',
      password: 'postgres',
      database: 'postgres',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
