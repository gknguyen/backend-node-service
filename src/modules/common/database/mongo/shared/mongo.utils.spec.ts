import * as _ from 'lodash';
import { Types } from 'mongoose';
import {
  convertMapToPlainObject,
  convertObject,
  convertSetToObject,
  forOwnRecursive,
  getObjectId,
} from './mongo.utils';

describe('mongo.utils', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2021-10-02'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const map = new Map();
  map.set('a', 'a');

  it('should query inside an object when call forOwnRecursive', async () => {
    forOwnRecursive({ a: ['a'] }, (value, key) => {
      expect(value).toEqual('a');
      expect(key).toEqual(['a', '0']);
      return _.identity;
    });
  });

  it('should convert successfully when call convertSetToObject', async () => {
    const result = convertSetToObject(new Set(['a', 'b']));
    expect(result).toEqual(['a', 'b']);
  });

  it('should convert successfully when call convertMapToPlainObject', async () => {
    const result = convertMapToPlainObject(map);
    expect(result).toEqual({ a: 'a' });
  });

  it('should convert successfully when call convertMapToPlainObject', async () => {
    const objectId = new Types.ObjectId();
    const object = {
      a: objectId,
      b: new Types.Decimal128('9823.1297'),
      c: new Set(['a', 'b']),
      d: map,
      _id: () => '_id',
      _v: () => '_v',
    };
    const array = [
      objectId,
      new Types.Decimal128('9823.1297'),
      new Set(['a', 'b']),
      map,
      () => '_id',
      () => '_v',
    ];
    const convertedObject = {
      a: objectId.toHexString(),
      b: 9823.1297,
      c: ['a', 'b'],
      d: { a: 'a' },
    };
    const objectResult = convertObject(object);
    expect(objectResult.a).toEqual(convertedObject.a);
    const arrayResult = convertObject(array);
    expect(arrayResult[0]).toEqual(convertedObject.a);
  });

  describe('getObjectId', () => {
    it(`should return object id`, async () => {
      const input = '60991193206bff0d1801b68a';
      const expected = new Types.ObjectId('60991193206bff0d1801b68a');
      expect(getObjectId(input)).toEqual(expected);
    });
  });
});
