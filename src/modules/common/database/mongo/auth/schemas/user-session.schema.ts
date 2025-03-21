import { Document, Schema } from 'mongoose';
import { IUserSession } from 'src/modules/domain/auth/user-session/shared/user-session.interface';
import { TableName } from '../../../shared/database.const';
import { convertObject } from '../../shared/mongo.utils';

export interface IUserSessionDocument extends IUserSession, Document {}

export const UserSessionSchema = new Schema<IUserSessionDocument>(
  {
    userId: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
    deleteAt: { type: Date },
  },
  {
    collection: TableName.UserSession,
    timestamps: true,
    toJSON: {
      transform: (_, ret) => convertObject(ret),
      virtuals: true,
    },
    toObject: {
      transform: (_, ret) => convertObject(ret),
      virtuals: true,
    },
  },
);
