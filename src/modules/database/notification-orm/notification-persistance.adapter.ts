import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RandomUtils } from 'src/core/utils/random.utils';
import { Notification } from 'src/domain/notifications/notification.type';
import { INotificationStorePort } from 'src/domain/notifications/out/notufucation-store.port';
import { UserId } from 'src/domain/users/entities/user.entity';
import { Repository } from 'typeorm';
import { NotificationMapper } from './notification-mapper';
import { NotificationOrmEntity } from './notification.orm-entity';

@Injectable()
export class NotificationPersistanceAdapter implements INotificationStorePort {
  constructor(
    @InjectRepository(NotificationOrmEntity)
    private readonly _notificationRepository: Repository<NotificationOrmEntity>,
  ) {}

  public async saveNotification(
    notification: Notification,
    userId: UserId,
  ): Promise<void> {
    const notificationOrm = NotificationMapper.mapToOrmEntity(
      notification,
      RandomUtils.randomString(16),
      userId,
    );
    await this._notificationRepository.save(notificationOrm);
  }
}
