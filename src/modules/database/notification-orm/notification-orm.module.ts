import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationPersistanceAdapter } from './notification-persistance.adapter';
import { NotificationOrmEntity } from './notification.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationOrmEntity])],
  providers: [NotificationPersistanceAdapter],
  exports: [NotificationPersistanceAdapter],
})
export class NotificationOrmModule {}
