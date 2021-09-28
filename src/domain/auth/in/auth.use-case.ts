import { Jwt, RegisterResult } from 'src/domain/auth/auth.type';
import { UserEntity } from 'src/domain/auth/entities/user.entity';

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
