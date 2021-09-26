import { UserId } from 'src/domain/entities/user.entity';

export type Jwt = {
  accesToken: string;
  refreshToken: string;
};

export type TokenId = string;

export type UserRefreshToken = {
  id: TokenId;
  userId: UserId;
  refreshToken: string;
};