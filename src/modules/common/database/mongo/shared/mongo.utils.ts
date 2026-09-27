import { Decimal128, ObjectId } from 'bson';
import {
  cloneDeepWith,
  concat,
  dropRight,
  forEach,
  forOwn,
  fromPairs,
  get,
  identity,
  isArray,
  isEqual,
  isFunction,
  isPlainObject,
  isString,
  last,
  set,
  toPath,
  unset,
} from 'lodash';
import { ClientSession, Types } from 'mongoose';
import { IAnyObject, IConvertObjectOptions } from './mongo.interface';

export function forOwnRecursive(
  obj: any,
  iteratee: (value: any, path: string[], obj: any) => any = identity,
): any {
  return forOwn(obj, (value: any, key: any) => {
    const path: string[] = [].concat(key.toString());
    if (isPlainObject(value) || isArray(value))
      return forOwnRecursive(value, (v, p) => iteratee(v, path.concat(p), obj));
    return iteratee(value, path, obj);
  });
}

export function convertSetToObject<T = any>(value: Set<T>): T[] {
  return Array.from(value.values());
}

export function convertMapToPlainObject<T = any>(value: Map<string, T>): { [key: string]: T } {
  return fromPairs(Array.from(value.entries()));
}

export function convertObject<T = IAnyObject>(obj: T, options: IConvertObjectOptions = {}): T {
  const defaultReplacer = (value: any) => {
    if (value instanceof ObjectId) return value.toHexString();
    else if (value instanceof Decimal128) return Number(value.toString());
    else if (value instanceof Set) return convertSetToObject(value);
    else if (value instanceof Map) return convertMapToPlainObject(value);
  };

  const {
    exclude = ['_v'],
    excludePrefix = '_',
    replacer = defaultReplacer,
    keymap = { _id: 'id' },
  } = options;

  const resultObj = cloneDeepWith(obj, replacer);

  if (isPlainObject(resultObj) || isArray(resultObj)) {
    forOwnRecursive(resultObj, (value, path) => {
      const key = last(path);
      if (key) {
        const newKey = isFunction(keymap) ? keymap(key) : get(keymap, key);
        if (newKey) set(resultObj, concat(dropRight(path), newKey), value);
      }
    });

    forOwnRecursive(resultObj, (_value, path) => {
      if (excludePrefix && last(path)?.startsWith(excludePrefix)) unset(resultObj, path);
      forEach(exclude, (field) => {
        if (isString(field)) field = toPath(field);
        if (isEqual(field, path)) {
          unset(resultObj, path);
          return false;
        }
      });
    });
  }

  return resultObj;
}

export function getObjectId(value?: string) {
  try {
    return new Types.ObjectId(value);
  } catch (_) {
    return new Types.ObjectId();
  }
}

export async function handleSession<T>(
  session: ClientSession,
  asyncFunc: () => Promise<T>,
): Promise<T> {
  let res: any;

  try {
    await session.withTransaction(async () => {
      res = await asyncFunc();
    });

    return res;
  } finally {
    await session.endSession();
  }
}

export function getConnectionString(params: {
  host: string;
  port?: number;
  username?: string;
  password?: string;
  database: string;
}) {
  let uri = 'mongodb://';

  if (params.username && params.password) {
    uri += `${params.username}:${params.password}@`;
  }

  uri += params.host;

  if (params.port) {
    uri += `:${params.port}`;
  }

  uri += `/${params.database}`;

  return uri;
}
