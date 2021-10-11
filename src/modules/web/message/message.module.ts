import { Module } from '@nestjs/common';
import { IMessageStorePort } from 'src/domain/message/out/message-store.port';
import {
  MessageService,
  MessageServiceSymbol,
} from 'src/domain/message/services/message.service';
import {
  IRoomsUseCase,
  RoomServiceSymbol,
} from 'src/domain/rooms/in/rooms.use-case';
import { DatabaseModule } from 'src/modules/database/database.module';
import { MessagePersistanceAdapter } from 'src/modules/database/message-orm/message-persistance.adapter';
import { NotificationModule } from '../notification/notification.module';
import {
  NotificationServiceSymbol,
  NotificationWebService,
} from '../notification/services/notification.service';
import { RoomModule } from '../room/room.module';
import { MessageResolver } from './graphql/message.resolver';

@Module({
  imports: [DatabaseModule, RoomModule, NotificationModule],
  providers: [
    {
      provide: MessageServiceSymbol,
      useFactory: (
        roomService: IRoomsUseCase,
        messageStorePort: IMessageStorePort,
        notificationService: NotificationWebService,
      ) =>
        new MessageService(roomService, messageStorePort, notificationService),
      inject: [
        RoomServiceSymbol,
        MessagePersistanceAdapter,
        NotificationServiceSymbol,
      ],
    },
    MessageResolver,
  ],
})
export class MessageModule {}
