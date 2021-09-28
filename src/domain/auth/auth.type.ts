import { UserId } from './entities/user.entity';

export enum RegisterResult {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export type Jwt = {
  accessToken: string;
  refreshToken: string;
};

export type TokenId = string;

export type UserRefreshToken = {
  id: TokenId;
  userId: UserId;
  refreshToken: string;
};
