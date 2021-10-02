import { SetMetadata } from '@nestjs/common';
import { MetadataKeys } from 'src/core/enums/metadata-keys';

export type AuthCheck = {
  withoutAuth: boolean;
  needattempt?: boolean;
};

export const WithoutAuth = (needAttempt = false) =>
  SetMetadata(MetadataKeys.WITHOUT_AUTH, {
    withoutAuth: true,
    needAttempt,
  });
