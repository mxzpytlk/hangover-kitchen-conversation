import { Inject } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GQLContext } from 'src/core/types';
import { MessageEntity } from 'src/domain/message/entities/message.entity';
import { IMessageUseCase } from 'src/domain/message/in/message.use-case';
import { MessageServiceSymbol } from 'src/domain/message/services/message.service';
import { FileType } from 'src/domain/types';
import { Message, SendMessageInput } from 'src/graphql/graphql';
import { WithoutAuth } from '../../auth/decorators/without-auth.decorator';

@Resolver()
export class MessageResolver {
  constructor(
    @Inject(MessageServiceSymbol)
    private readonly _messageUseCase: IMessageUseCase,
  ) {}

  @Mutation()
  @WithoutAuth(true)
  public async sendMessage(
    @Context() ctx: GQLContext,
    @Args('message') message: SendMessageInput,
  ): Promise<Message> {
    const resultMessage = await this._messageUseCase.sendMessage(
      message.roomId,
      message.text,
      message.isAnonimus,
      message.repliedId,
      message.photoes,
      ctx.user,
    );
    return this.mapMessage(resultMessage);
  }

  private mapMessage(message: MessageEntity): Message {
    return {
      id: message.id,
      date: message.date.toISOString(),
      text: message.text,
      photoes: message.files
        .filter((file) => file.type === FileType.PHOTO)
        .map((photo) => photo.id),
      repliedId: message.repliedId,
      author: message.author,
    };
  }
}
