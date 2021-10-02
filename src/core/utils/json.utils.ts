import { JSObject } from '../types';

export class JSONUtils {
  public static converToJsonObject(obj: JSObject): JSObject {
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
