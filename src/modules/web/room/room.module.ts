import { Module } from '@nestjs/common';
import { INotificationPort } from 'src/domain/notifications/out/notification.port';
import { RoomServiceSymbol } from 'src/domain/rooms/in/rooms.use-case';
import { RoomService } from 'src/domain/rooms/services/room.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { RoomPersistanceAdapter } from 'src/modules/database/user-room-orm/adapters/room-persistance.adapter';
import { UserRoomPersistanceAdapter } from 'src/modules/database/user-room-orm/adapters/user-room-persistance.adapter';
import { NotificationModule } from '../notification/notification.module';
import { NotificationServiceSymbol } from '../notification/services/notification.service';
import { RoomResolver } from './graphql/room.resolver';

@Module({
  imports: [DatabaseModule, NotificationModule],
  providers: [
    {
      provide: RoomServiceSymbol,
      useFactory: (
        roomPersistanceAdapter: RoomPersistanceAdapter,
        userRoomPersistanceAdapter: UserRoomPersistanceAdapter,
        notificationPort: INotificationPort,
      ) =>
        new RoomService(
          roomPersistanceAdapter,
          userRoomPersistanceAdapter,
          notificationPort,
        ),
      inject: [
        RoomPersistanceAdapter,
        UserRoomPersistanceAdapter,
        NotificationServiceSymbol,
      ],
    },
    RoomResolver,
  ],
  exports: [RoomServiceSymbol],
})
export class RoomModule {}
