import { SetMetadata } from '@nestjs/common';
import { MetadataKeys } from 'src/core/enums/metadata-keys';

export type AuthCheck = {
  withoutAuth: boolean;
  needAttempt?: boolean;
  withoutProfileFullfiled?: boolean;
};

export const WithoutAuth = (needAttempt = false) =>
  SetMetadata(MetadataKeys.WITHOUT_AUTH, {
    withoutAuth: true,
    needAttempt,
  });
