import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: 'schema.graphql',
    }),
    UsersModule,
  ],
})
export class AppModule {}
