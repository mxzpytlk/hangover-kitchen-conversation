import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { RegisterResult } from 'src/domain/auth/auth.type';
import {
  AuthUseCaseSymbol,
  IAuthUseCase,
} from 'src/domain/auth/in/auth.use-case';
import { Inject, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/exception.filter';
import { SuccessAuth } from 'src/graphql/graphql';
import { GQLContext } from 'src/core/types';
import { CookieKeys } from 'src/core/enums/cookie-keys';
import { DateUtils } from 'src/core/utils/date.utils';
import { WithoutAuth } from '../decorators/without-auth.decorator';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject(AuthUseCaseSymbol) private readonly _authUseCase: IAuthUseCase,
  ) {}

  @UseFilters(HttpExceptionFilter)
  @Mutation(() => RegisterResult)
  @WithoutAuth()
  public async register(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<RegisterResult> {
    return this._authUseCase.register(email, password);
  }

  @UseFilters(HttpExceptionFilter)
  @Query()
  @WithoutAuth()
  public async login(
    @Context() context: GQLContext,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<SuccessAuth> {
    const {
      user,
      jwt: { accessToken, refreshToken },
    } = await this._authUseCase.login(email, password);
    context.res.cookie(CookieKeys.REFRESH_TOKEN, refreshToken, {
      maxAge: DateUtils.daysToMiliseconds(30),
      httpOnly: true,
    });

    return {
      user,
      accessToken,
    };
  }

  @UseFilters(HttpExceptionFilter)
  @Mutation()
  @WithoutAuth()
  public async refresh(@Context() context: GQLContext): Promise<SuccessAuth> {
    const { res, req } = context;
    const oldRefreshToken: string = req.cookies[CookieKeys.REFRESH_TOKEN];

    const {
      user,
      jwt: { accessToken, refreshToken },
    } = await this._authUseCase.refresh(oldRefreshToken);

    res.cookie(CookieKeys.REFRESH_TOKEN, refreshToken, {
      maxAge: DateUtils.daysToMiliseconds(30),
      httpOnly: true,
    });

    return {
      user,
      accessToken,
    };
  }

  @UseFilters(HttpExceptionFilter)
  @Mutation()
  @WithoutAuth()
  public async logout(@Context() { req, res }: GQLContext): Promise<boolean> {
    const refreshToken: string = req.cookies.refreshToken;
    res.clearCookie(CookieKeys.REFRESH_TOKEN);
    await this._authUseCase.logout(refreshToken);
    return true;
  }
}
