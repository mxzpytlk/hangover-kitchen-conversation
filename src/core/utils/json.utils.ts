import { JSObject } from '../types';

export class JSONUtils {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static converToJsonObject(obj: Record<string, any>): JSObject {
    const newObj = {};
    if (!obj) {
      return null;
    }

    for (const [key, value] of Object.entries(obj)) {
      JSONUtils.setField(newObj, key, value);
    }

    return newObj;
  }

  private static setField(newObj: JSObject, key: string, value: any): void {
    if (value === null || value === undefined) {
      return;
    }

    switch (typeof value) {
      case 'function':
        break;
      case 'object':
        newObj[key] = JSONUtils.converToJsonObject(value);
        break;
      default:
        newObj[key] = value;
        break;
    }
  }
}
