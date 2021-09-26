import { v4 } from 'uuid';

export class RandomUtils {
  public static randomString(length?: number): string {
    return v4().slice(0, length);
  }
}
