import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebModule } from './modules/web/web.module';
import { DatabaseModule } from './modules/database/database.module';
import { environment } from './core/env';

type TypeOrmDbType =
  | 'mysql'
  | 'postgres'
  | 'cockroachdb'
  | 'sqlite'
  | 'mssql'
  | 'sap'
  | 'oracle'
  | 'cordova'
  | 'mongodb'
  | 'expo'
  | 'better-sqlite3'
  | 'capacitor';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql/graphql.ts'),
        outputAs: 'interface',
      },
      context: ({ req, res, connectionParams }) => ({
        req,
        res,
        connectionParams,
      }),
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': {
          path: '/subscription',
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: environment.ORM_TYPE as TypeOrmDbType,
      host: environment.ORM_HOST,
      port: +environment.ORM_PORT,
      username: environment.ORM_USERNAME,
      password: environment.ORM_PASSWORD,
      entities: ['dist/**/*.orm-entity{.ts,.js}'],
      synchronize: false,
      database: environment.ORM_DATABASE,
    }),
    WebModule,
    DatabaseModule,
  ],
  providers: [],
})
export class AppModule {}
