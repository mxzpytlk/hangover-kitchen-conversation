import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  TokenServiceSymbol,
  TokenService,
} from 'src/domain/auth/token.service';
import { TokenPersistenceAdapter } from './token-persistance.adapter';
import { TokenOrmEntity } from './token.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenOrmEntity])],
  providers: [
    TokenPersistenceAdapter,
    {
      provide: TokenServiceSymbol,
      useFactory: (tokenPersistenceAdapter: TokenPersistenceAdapter) =>
        new TokenService(tokenPersistenceAdapter),
      inject: [TokenPersistenceAdapter],
    },
  ],
  exports: [TokenPersistenceAdapter, TokenServiceSymbol],
})
export class TokenOrmModule {}
