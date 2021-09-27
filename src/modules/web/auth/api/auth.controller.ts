import { Controller, Get, Inject, Param, Redirect } from '@nestjs/common';
import {
  AuthUseCaseSymbol,
  IAuthUseCase,
} from 'src/domain/auth/in/auth.use-case';
import * as config from 'src/assets/config.json';
import { RedirectType } from 'src/core/types';

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
        url: config.clientUrl,
      };
    } catch (error) {
      return {
        url: config.clientUrlError,
      };
    }
  }
}
