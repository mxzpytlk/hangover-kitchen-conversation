export enum FileType {
  PHOTO = 'PHOTO',
}

export type HKCFile = {
  type: FileType;
  id: string;
};
