import ENV from 'src/shared/env';
import { DataSource } from 'typeorm';
import { DatabaseDomain, POSTGRES_ACCOUNT_TOKEN } from '../../shared/database.const';

export const AccountDataSource = new DataSource({
  type: 'postgres',
  name: DatabaseDomain.Account,
  host: ENV.POSTGRES.ACCOUNT.HOST,
  port: ENV.POSTGRES.ACCOUNT.PORT,
  username: ENV.POSTGRES.ACCOUNT.USERNAME,
  password: ENV.POSTGRES.ACCOUNT.PASSWORD,
  database: ENV.POSTGRES.ACCOUNT.DATABASE,
  schema: ENV.POSTGRES.ACCOUNT.SCHEMA,
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: ENV.POSTGRES.ACCOUNT.MIGRATIONS_RUN,
  migrationsTransactionMode: 'each',
  logger: 'advanced-console',
  connectTimeoutMS: ENV.POSTGRES.ACCOUNT.CONNECTION_TIMEOUT,
  maxQueryExecutionTime: ENV.POSTGRES.ACCOUNT.MAX_QUERY_EXECUTION_TIME,
  poolSize: ENV.POSTGRES.ACCOUNT.POOL_SIZE,
  entities: [__dirname + '/schemas/*{.ts,.js}'],
});

export const AccountDatabaseProvider = {
  provide: POSTGRES_ACCOUNT_TOKEN,
  useFactory: () => AccountDataSource,
};
