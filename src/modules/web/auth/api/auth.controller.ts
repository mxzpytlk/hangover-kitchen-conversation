import { Controller, Get, Inject, Param, Redirect } from '@nestjs/common';
import {
  AuthUseCaseSymbol,
  IAuthUseCase,
} from 'src/domain/auth/in/auth.use-case';
import { RedirectType } from 'src/core/types';
import { environment } from 'src/core/env';

@Controller('api')
export class AuthController {
  constructor(
    @Inject(AuthUseCaseSymbol) private readonly _authService: IAuthUseCase,
  ) {}

  @Get('activate/:link')
  @Redirect()
  public async activate(
    @Param('link') activationLink: string,
  ): Promise<RedirectType> {
    try {
      await this._authService.activate(activationLink);
      return {
        url: environment.CLIENT_URL,
      };
    } catch (error) {
      return {
        url: environment.CLIENT_URL_ERROR,
      };
    }
  }
}
