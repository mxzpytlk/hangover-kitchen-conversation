import { Inject } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GQLContext } from 'src/core/types';
import { RoomEntity } from 'src/domain/rooms/entities/room.entity';
import {
  IRoomsUseCase,
  RoomServiceSymbol,
} from 'src/domain/rooms/in/rooms.use-case';
import { Room } from 'src/graphql/graphql';
import { WithoutAuth } from '../../auth/decorators/without-auth.decorator';

@Resolver()
export class RoomResolver {
  constructor(
    @Inject(RoomServiceSymbol) private readonly _roomUseCase: IRoomsUseCase,
  ) {}

  @Mutation()
  public async createRoom(
    @Context() context: GQLContext,
    @Args('title') title: string,
    @Args('description') description?: string,
    @Args('isOpen') isOpen = true,
    @Args('limit') limit?: number,
    @Args('canSendAnonimusMessage') canSendAnonimusMessage = true,
  ): Promise<RoomEntity> {
    const user = context.user;
    return this._roomUseCase.createRoom(
      user,
      title,
      isOpen,
      description,
      limit,
      canSendAnonimusMessage,
    );
  }

  @Query()
  @WithoutAuth()
  public async getRooms(): Promise<Room[]> {
    const rooms = await this._roomUseCase.getRooms();
    return rooms.map((room) => {
      const { id, title, isOpen, users, limit } = room;

      return {
        id,
        title,
        isOpen,
        limit,
        participantsCount: users.length,
      };
    });
  }

  @Query()
  @WithoutAuth(true)
  public async getRoom(
    @Context() context: GQLContext,
    @Args('roomId') roomId: string,
  ): Promise<Room> {
    const user = context.user;
    const room = await this._roomUseCase.getRoom(roomId, user);
    const {
      id,
      title,
      description,
      date,
      isOpen,
      users,
      limit,
      canSendAnonimusMessage,
    } = room;

    return {
      id,
      title,
      isOpen,
      description,
      date: date.toISOString(),
      participantsCount: users.length,
      limit,
      canSendAnonimusMessage,
    };
  }

  @Mutation()
  public async joinRoom(
    @Context() context: GQLContext,
    @Args('roomId') roomId: string,
  ): Promise<Room> {
    const user = context.user;
    const room = await this._roomUseCase.joinRoom(user, roomId);

    if (!room) {
      return null;
    }

    const {
      id,
      title,
      description,
      date,
      isOpen,
      users,
      limit,
      canSendAnonimusMessage,
    } = room;

    return {
      id,
      title,
      isOpen,
      description,
      date: date.toISOString(),
      participantsCount: users.length,
      limit,
      canSendAnonimusMessage,
    };
  }
}
