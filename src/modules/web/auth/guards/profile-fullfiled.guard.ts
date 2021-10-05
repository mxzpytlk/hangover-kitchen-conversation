import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MetadataKeys } from 'src/core/enums/metadata-keys';
import { GQLContext } from 'src/core/types';
import { UserPersistenceAdapter } from 'src/modules/database/user-orm/user-persistance.adapter';
import { AuthCheck } from '../decorators/without-auth.decorator';

@Injectable()
export class ProfileFullfiledGuard implements CanActivate {
  constructor(
    private readonly _userPersistanceAdapter: UserPersistenceAdapter,
    private readonly _reflector: Reflector,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const withoutAuth = this._reflector.get<AuthCheck>(
      MetadataKeys.WITHOUT_AUTH,
      context.getHandler(),
    );
    const withoutProfileFulfiled = this._reflector.get<boolean>(
      MetadataKeys.WITHOUT_PROFILE_FULLFILED,
      context.getHandler(),
    );
    if (
      (withoutAuth?.withoutAuth && !withoutAuth.needattempt) ||
      withoutProfileFulfiled
    ) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext<GQLContext>();
    const user = await this._userPersistanceAdapter.getUserById(ctx.user.id);
    ctx.user = user;
    return user.isProfileFullfiled || withoutAuth?.needattempt;
  }
}
