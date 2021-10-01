import { UserEntity } from 'src/domain/users/entities/user.entity';

export type UsersInRoom = {
  commonUsers: UserEntity[];
  admin: UserEntity;
};

export type MessageId = string;
export type MessageText = string;
export type FileId = string;

export type MessageValue = MessageId | MessageText | FileId;
export enum MessageType {
  TEXT,
  FILE,
  REPLY,
}

export type Message = {
  value: MessageValue;
  owner?: UserEntity;
};
