import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MetadataKeys } from 'src/core/enums/metadata-keys';
import { Exception } from 'src/core/shared/exception';
import { GQLContext } from 'src/core/types';
import {
  TokenService,
  TokenServiceSymbol,
} from 'src/domain/auth/token.service';
import { AuthCheck } from '../decorators/without-auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TokenServiceSymbol) private readonly _tokenService: TokenService,
    private readonly _reflector: Reflector,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const checkAuth = this._reflector.get<AuthCheck>(
      MetadataKeys.WITHOUT_AUTH,
      context.getHandler(),
    );

    if (checkAuth?.withoutAuth && !checkAuth.needattempt) {
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext<GQLContext>();
    const { req } = ctx;
    const accessToken = req.headers.authorization?.split(' ')?.[1];
    if (accessToken) {
      const user = await this._tokenService.validateAcessToken(accessToken);
      if (user) {
        ctx.user = user;
        return true;
      }
    }

    if (checkAuth?.withoutAuth) {
      return true;
    }
    throw Exception.WRONG_AUTH_DATA;
  }
}
