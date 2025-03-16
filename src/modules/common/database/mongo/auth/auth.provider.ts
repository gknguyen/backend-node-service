import { connect } from 'mongoose';
import ENV from '../../../../../shared/env';
import { MONGO_AUTH_TOKEN } from '../../shared/database.const';
import { getConnectionString } from '../shared/mongo.utils';

export const authConnectionString = getConnectionString({
  host: ENV.MONGODB.AUTH.HOST,
  port: ENV.MONGODB.AUTH.PORT,
  username: ENV.MONGODB.AUTH.USERNAME,
  password: ENV.MONGODB.AUTH.PASSWORD,
  database: ENV.MONGODB.AUTH.DATABASE,
});

export const AuthDatabaseProvider = {
  provide: MONGO_AUTH_TOKEN,
  useFactory: () =>
    connect(authConnectionString, {
      autoIndex: false,
      directConnection: ENV.MONGODB.AUTH.DIRECT_CONNECTION,
    }),
};
