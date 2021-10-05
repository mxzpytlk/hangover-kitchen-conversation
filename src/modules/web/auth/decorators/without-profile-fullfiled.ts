import { SetMetadata } from '@nestjs/common';
import { MetadataKeys } from 'src/core/enums/metadata-keys';

export const WithoutProfileFullfiled = () =>
  SetMetadata(MetadataKeys.WITHOUT_PROFILE_FULLFILED, true);
