import { Inject } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GQLContext } from 'src/core/types';
import {
  IUserUseCase,
  UserUseCaseSymbol,
} from 'src/domain/users/in/user.use-case';
import {
  PersonalInfo,
  PersonalInfoChanges,
} from 'src/domain/users/model/personal-info';
import { WithoutProfileFullfiled } from '../../auth/decorators/without-profile-fullfiled';

@Resolver()
export class UserResolver {
  constructor(
    @Inject(UserUseCaseSymbol) private readonly _userUseCase: IUserUseCase,
  ) {}

  @Mutation()
  @WithoutProfileFullfiled()
  public async updateProfileInfo(
    @Context() context: GQLContext,
    @Args('changes') changes: PersonalInfoChanges,
  ): Promise<PersonalInfo> {
    const user = context.user;
    return this._userUseCase.updateProfileInfo(user, changes);
  }
}
