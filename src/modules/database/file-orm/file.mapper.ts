import { HKCFile } from 'src/domain/types';
import { FileOrmEntity } from './file.orm-entity';

type NullableFileProps = {
  messageId: string;
};

export class FileMapper {
  public static mapToOrm(
    file: HKCFile,
    nullableProps: NullableFileProps,
  ): FileOrmEntity {
    const fileOrm = new FileOrmEntity();
    fileOrm.id = file.id;
    fileOrm.type = file.type;
    fileOrm.messageId = nullableProps.messageId;
    return fileOrm;
  }

  public static mapToDomain(fileOrm: FileOrmEntity): HKCFile {
    return fileOrm;
  }
}
