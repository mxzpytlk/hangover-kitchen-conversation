import { UserName } from '../user.types';

export type PersonalInfo = {
  name: UserName;
  description?: string;
};

export type PersonalInfoChanges = Partial<PersonalInfo>;
