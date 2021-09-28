import { RegisterResult } from 'src/domain/auth/auth.type';
import { UserEntity } from 'src/domain/entities/user.entity';
import { Jwt } from '../token/token.type';

export const AuthUseCaseSymbol = Symbol('AuthUseCase');

export type SuccessAuth = {
  user: UserEntity;
  jwt: Jwt;
};

export interface IAuthUseCase {
  register(email: string, password: string): Promise<RegisterResult>;
  activate(activationLink: string): Promise<void>;
  login(email: string, password: string): Promise<SuccessAuth>;
  refresh(refreshToken: string): Promise<SuccessAuth>;
  logout(refreshToken: string): Promise<void>;
}
