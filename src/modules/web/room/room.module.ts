import { Module } from '@nestjs/common';
import { RoomServiceSymbol } from 'src/domain/rooms/in/rooms.use-case';
import { RoomService } from 'src/domain/rooms/services/room.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { RoomPersistanceAdapter } from 'src/modules/database/user-room-orm/adapters/room-persistance.adapter';
import { UserRoomPersistanceAdapter } from 'src/modules/database/user-room-orm/adapters/user-room-persistance.adapter';
import { RoomResolver } from './graphql/room.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: RoomServiceSymbol,
      useFactory: (
        roomPersistanceAdapter: RoomPersistanceAdapter,
        userRoomPersistanceAdapter: UserRoomPersistanceAdapter,
      ) =>
        new RoomService(
          roomPersistanceAdapter,
          userRoomPersistanceAdapter,
          null,
        ),
      inject: [RoomPersistanceAdapter, UserRoomPersistanceAdapter],
    },
    RoomResolver,
  ],
})
export class RoomModule {}
