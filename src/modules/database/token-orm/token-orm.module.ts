import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenPersistenceAdapter } from './token-persistance.adapter';
import { TokenOrmEntity } from './token.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenOrmEntity])],
  providers: [TokenPersistenceAdapter],
  exports: [TokenPersistenceAdapter],
})
export class TokenOrmModule {}
