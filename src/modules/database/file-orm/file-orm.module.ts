import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileOrmEntity } from './file.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileOrmEntity])],
})
export class FileOrmModule {}
