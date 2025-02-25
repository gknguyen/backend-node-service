import ENV from 'src/shared/env';
import { DataSource } from 'typeorm';
import { DatabaseDomain } from '../../shared/database.const';

export const AuthDataSource = new DataSource({
  type: 'postgres',
  name: DatabaseDomain.Auth,
  host: ENV.DATABASE.AUTH.HOST,
  port: ENV.DATABASE.AUTH.PORT,
  username: ENV.DATABASE.AUTH.USERNAME,
  password: ENV.DATABASE.AUTH.PASSWORD,
  database: ENV.DATABASE.AUTH.DATABASE,
  schema: ENV.DATABASE.AUTH.SCHEMA,
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: true,
  migrationsTransactionMode: 'each',
  logger: 'advanced-console',
  connectTimeoutMS: ENV.DATABASE.AUTH.CONNECTION_TIMEOUT,
  maxQueryExecutionTime: ENV.DATABASE.AUTH.MAX_QUERY_EXECUTION_TIME,
  poolSize: ENV.DATABASE.AUTH.POOL_SIZE,
  entities: [__dirname + '/schemas/*{.ts,.js}'],
});

export const AuthDatabaseProvider = {
  provide: DatabaseDomain.Auth,
  useFactory: () => AuthDataSource,
};
