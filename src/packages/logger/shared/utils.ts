import * as httpContext from 'express-http-context';
import { isPlainObject } from 'lodash';
import { ILogInput } from './interface';

export function getUserId(): string | undefined {
  return httpContext.get('user')?.id;
}

export function serializedError(error: ILogInput) {
  const errorKeys = ['error', 'err'];

  if (error instanceof Error) {
    const obj: ILogInput = {};
    for (const key of Object.getOwnPropertyNames(error)) {
      const value = (error as any)[key];
      if (value) {
        if (errorKeys.includes(key)) obj.reason = serializedError(value);
        else obj[key] = serializedError(value);
      }
    }
    return Object.keys(obj).length ? obj : undefined;
  }

  if (isPlainObject(error)) {
    const obj: ILogInput = {};
    for (const key of Object.keys(error)) {
      if (error[key]) {
        if (errorKeys.includes(key)) obj.reason = serializedError(error[key]);
        else obj[key] = serializedError(error[key]);
      }
    }
    return Object.keys(obj).length ? obj : undefined;
  }

  return error;
}
