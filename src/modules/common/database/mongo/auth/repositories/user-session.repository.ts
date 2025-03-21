import { Injectable } from '@nestjs/common';
import { FilterQuery, model, Model, QueryOptions, SaveOptions } from 'mongoose';
import { IUserSession } from 'src/modules/domain/auth/user-session/shared/user-session.interface';
import ENV from 'src/shared/env';
import { TPartialBy } from 'src/shared/interface';
import { MONGO_AUTH_TOKEN } from '../../../shared/database.const';
import { IWithMongoId } from '../../shared/mongo.interface';
import { convertObject } from '../../shared/mongo.utils';
import { IUserSessionDocument, UserSessionSchema } from '../schemas/user-session.schema';

@Injectable()
export class UserSessionRepository {
  private dataModel: Model<IUserSessionDocument>;

  constructor() {
    this.dataModel = model(MONGO_AUTH_TOKEN, UserSessionSchema);
  }

  async create(
    doc: TPartialBy<IUserSession, 'isDeleted' | 'createdAt' | 'updatedAt'> & IWithMongoId,
    options?: SaveOptions,
  ) {
    const [result] = await this.dataModel.create([doc], options);
    return result;
  }

  async invalidate(filter: FilterQuery<IUserSessionDocument> = {}, options?: QueryOptions) {
    const query = this.dataModel.findOneAndUpdate(
      { isDeleted: false, ...filter },
      {
        $set: {
          isDeleted: true,
          deleteAt: new Date(Date.now() + ENV.DATA_MODEL.USER_SESSION.DELETE_AT),
        },
      },
      { new: true, ...options },
    );
    const document = await (options?.select ? query.select(options.select) : query);
    if (document) return options?.lean ? convertObject(document) : document;
    return null;
  }

  async invalidateAll() {
    return this.dataModel.updateMany(
      { isDeleted: false },
      {
        $set: {
          isDeleted: true,
          deleteAt: new Date(Date.now() + ENV.DATA_MODEL.USER_SESSION.DELETE_AT),
        },
      },
    );
  }
}
