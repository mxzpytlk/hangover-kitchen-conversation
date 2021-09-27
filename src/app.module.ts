import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebModule } from './modules/web/web.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql/graphql.ts'),
        outputAs: 'interface',
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot(),
    WebModule,
    DatabaseModule,
  ],
  providers: [],
})
export class AppModule {}
