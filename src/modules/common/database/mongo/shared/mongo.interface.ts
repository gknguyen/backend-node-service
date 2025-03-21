import { Types } from 'mongoose';

export interface IConvertObjectOptions {
  exclude?: (string | string[])[];
  excludePrefix?: string;
  replacer?: (value: any) => any;
  keymap?: any;
}

export interface IAnyObject {
  [k: string]: any;
}

export type StringOrObjectId = string | Types.ObjectId;

export interface IWithMongoId {
  _id?: StringOrObjectId;
}
