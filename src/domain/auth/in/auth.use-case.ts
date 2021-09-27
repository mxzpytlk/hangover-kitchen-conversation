import { RegisterResult } from 'src/domain/auth/auth.type';

export const AuthUseCaseSymbol = Symbol('AuthUseCase');

export interface IAuthUseCase {
  register(email: string, password: string): Promise<RegisterResult>;
  activate(activationLink: string): Promise<void>;
}
