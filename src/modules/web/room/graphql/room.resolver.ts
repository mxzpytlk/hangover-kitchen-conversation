import { Inject } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GQLContext } from 'src/core/types';
import { RoomEntity } from 'src/domain/rooms/entities/room.entity';
import {
  IRoomsUseCase,
  RoomServiceSymbol,
} from 'src/domain/rooms/in/rooms.use-case';
import { PersonalInfo } from 'src/domain/users/model/personal-info';
import { Room } from 'src/graphql/graphql';
import { WithoutAuth } from '../../auth/decorators/without-auth.decorator';
import { WithoutProfileFullfiled } from '../../auth/decorators/without-profile-fullfiled';

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

  @Query('allRooms')
  @WithoutAuth()
  public async getRooms(
    @Args('from') from: number,
    @Args('to') to: number,
  ): Promise<Room[]> {
    const rooms = await this._roomUseCase.getRooms();
    return rooms.slice(from, to).map((room) => {
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

  @Query('room')
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

  @Query('managedRooms')
  @WithoutProfileFullfiled()
  public async getUserRooms(@Context() ctx: GQLContext): Promise<Room[]> {
    const rooms = await this._roomUseCase.getRoomsBelongUser(ctx.user);
    return rooms.map((room) => {
      const {
        id,
        title,
        isOpen,
        description,
        users,
        date,
        canSendAnonimusMessage,
        limit,
      } = room;

      return {
        id,
        title,
        isOpen,
        description,
        users: users.map((user) => user.user),
        date: date.toISOString(),
        canSendAnonimusMessage,
        limit,
        participantsCount: users.length,
      };
    });
  }

  @Query('waitingUsers')
  @WithoutProfileFullfiled()
  public async getWaitingUsers(
    @Context() ctx: GQLContext,
    @Args('roomId') roomId: string,
  ): Promise<PersonalInfo[]> {
    const users = await this._roomUseCase.getWaitingUsers(ctx.user, roomId);
    return users.map((user) => user.personalInfo);
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

  @Mutation()
  @WithoutProfileFullfiled()
  public async letUserIn(
    @Context() ctx: GQLContext,
    @Args('userName') userName: string,
    @Args('roomId') roomId: string,
  ): Promise<boolean> {
    await this._roomUseCase.letUserIn(ctx.user, userName, roomId);
    return true;
  }

  @Query('ownRooms')
  @WithoutProfileFullfiled()
  public async getOwnRooms(
    @Context() ctx: GQLContext,
    @Args('from') from: number,
    @Args('to') to: number,
  ): Promise<Room[]> {
    const rooms = await this._roomUseCase.getRoomsWithUser(ctx.user);

    return rooms.slice(from, to).map((room) => {
      const {
        id,
        title,
        isOpen,
        description,
        users,
        date,
        canSendAnonimusMessage,
        limit,
      } = room;

      return {
        id,
        title,
        isOpen,
        description,
        users: users.map((user) => user.user),
        date: date.toISOString(),
        canSendAnonimusMessage,
        limit,
        participantsCount: users.length,
      };
    });
  }
}
