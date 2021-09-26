import { JSObject } from '../types';

export class JSONUtils {
  public static converToJsonObject(obj: JSObject): JSObject {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      JSONUtils.setField(newObj, key, value);
    }

    return newObj;
  }

  private static setField(newObj: JSObject, key: string, value: any): void {
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
