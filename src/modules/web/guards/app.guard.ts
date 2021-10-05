import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ProfileFullfiledGuard } from '../auth/guards/profile-fullfiled.guard';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private readonly _authGuard: AuthGuard,
    private readonly _profileFullfiledGuard: ProfileFullfiledGuard,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    return (
      (await this._authGuard.canActivate(context)) &&
      (await this._profileFullfiledGuard.canActivate(context))
    );
  }
}
