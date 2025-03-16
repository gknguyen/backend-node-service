import ENV from 'src/shared/env';
import { DataSource } from 'typeorm';
import { DatabaseDomain, POSTGRES_ACCOUNT_TOKEN } from '../../shared/database.const';

export const AccountDataSource = new DataSource({
  type: 'postgres',
  name: DatabaseDomain.Account,
  host: ENV.DATABASE.ACCOUNT.HOST,
  port: ENV.DATABASE.ACCOUNT.PORT,
  username: ENV.DATABASE.ACCOUNT.USERNAME,
  password: ENV.DATABASE.ACCOUNT.PASSWORD,
  database: ENV.DATABASE.ACCOUNT.DATABASE,
  schema: ENV.DATABASE.ACCOUNT.SCHEMA,
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: ENV.DATABASE.ACCOUNT.MIGRATIONS_RUN,
  migrationsTransactionMode: 'each',
  logger: 'advanced-console',
  connectTimeoutMS: ENV.DATABASE.ACCOUNT.CONNECTION_TIMEOUT,
  maxQueryExecutionTime: ENV.DATABASE.ACCOUNT.MAX_QUERY_EXECUTION_TIME,
  poolSize: ENV.DATABASE.ACCOUNT.POOL_SIZE,
  entities: [__dirname + '/schemas/*{.ts,.js}'],
});

export const AccountDatabaseProvider = {
  provide: POSTGRES_ACCOUNT_TOKEN,
  useFactory: () => AccountDataSource,
};
