import { Inject } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GQLContext } from 'src/core/types';
import { RoomEntity } from 'src/domain/rooms/entities/room.entity';
import {
  IRoomsUseCase,
  RoomServiceSymbol,
} from 'src/domain/rooms/in/rooms.use-case';

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
}
