import { mongoMigrateCli } from 'mongo-migrate-ts';
import { join } from 'path';
import ENV from '../../../../../shared/env';
import { authConnectionString } from './auth.provider';

mongoMigrateCli({
  uri: authConnectionString,
  migrationsDir: join(__dirname, `./migrations`),
  migrationsCollection: 'migrations',
  options: {
    directConnection: ENV.MONGODB.AUTH.DIRECT_CONNECTION,
  },
});
