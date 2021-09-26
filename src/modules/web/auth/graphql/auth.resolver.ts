import { Resolver, Mutation, Args, registerEnumType } from '@nestjs/graphql';
import { RegisterResult } from 'src/domain/auth/auth.type';
import {
  AuthUseCaseSymbol,
  IAuthUseCase,
} from 'src/domain/auth/in/auth.use-case';
import { Inject, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/exception.filter';

registerEnumType(RegisterResult, {
  name: 'RegisterResult',
});

@Resolver()
export class AuthResolver {
  constructor(
    @Inject(AuthUseCaseSymbol) private readonly _authUseCase: IAuthUseCase,
  ) {}

  @UseFilters(HttpExceptionFilter)
  @Mutation(() => RegisterResult)
  public async register(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<RegisterResult> {
    return this._authUseCase.register(email, password);
  }
}
