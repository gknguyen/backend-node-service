import ENV from 'src/shared/env';
import { DataSource } from 'typeorm';
import { DatabaseDomain, POSTGRES_AUTH_TOKEN } from '../../shared/database.const';

export const AuthDataSource = new DataSource({
  type: 'postgres',
  name: DatabaseDomain.Auth,
  host: ENV.POSTGRES.AUTH.HOST,
  port: ENV.POSTGRES.AUTH.PORT,
  username: ENV.POSTGRES.AUTH.USERNAME,
  password: ENV.POSTGRES.AUTH.PASSWORD,
  database: ENV.POSTGRES.AUTH.DATABASE,
  schema: ENV.POSTGRES.AUTH.SCHEMA,
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: ENV.POSTGRES.AUTH.MIGRATIONS_RUN,
  migrationsTransactionMode: 'each',
  logger: 'advanced-console',
  connectTimeoutMS: ENV.POSTGRES.AUTH.CONNECTION_TIMEOUT,
  maxQueryExecutionTime: ENV.POSTGRES.AUTH.MAX_QUERY_EXECUTION_TIME,
  poolSize: ENV.POSTGRES.AUTH.POOL_SIZE,
  entities: [__dirname + '/schemas/*{.ts,.js}'],
});

export const AuthDatabaseProvider = {
  provide: POSTGRES_AUTH_TOKEN,
  useFactory: () => AuthDataSource,
};
