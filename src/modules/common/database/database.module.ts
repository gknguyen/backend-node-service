import { Global, Inject, Module, OnModuleInit } from '@nestjs/common';
import ENV from 'src/shared/env';
import { logger } from 'src/shared/logger';
import { DataSource } from 'typeorm';
import {
  MONGO_AUTH_TOKEN,
  POSTGRES_ACCOUNT_TOKEN,
  POSTGRES_AUTH_TOKEN,
} from './shared/database.const';
import { DatabaseProviders } from './shared/database.provider';
import { DatabaseRepositories } from './shared/database.repositories';
import { Mongoose } from 'mongoose';

@Global()
@Module({
  providers: [...DatabaseProviders, ...DatabaseRepositories],
  exports: [...DatabaseRepositories],
})
export class DatabaseModule implements OnModuleInit {
  constructor(
    @Inject(POSTGRES_AUTH_TOKEN) private readonly authDataSource: DataSource,
    @Inject(POSTGRES_ACCOUNT_TOKEN) private readonly accountDataSource: DataSource,

    @Inject(MONGO_AUTH_TOKEN) private readonly mongoose: Mongoose,
  ) {}

  async onModuleInit() {
    await Promise.all([
      this.authDataSource
        .initialize()
        .then(() =>
          logger.info(
            `Connected to PostgresDB: ${ENV.POSTGRES.AUTH.HOST} [${ENV.POSTGRES.AUTH.DATABASE}]`,
          ),
        )
        .catch((err) => {
          logger.error(
            `Failed to connect to PostgresDB: ${ENV.POSTGRES.AUTH.HOST} [${ENV.POSTGRES.AUTH.DATABASE}]`,
          );
          throw err;
        }),
      this.accountDataSource
        .initialize()
        .then(() =>
          logger.info(
            `Connected to PostgresDB: ${ENV.POSTGRES.ACCOUNT.HOST} [${ENV.POSTGRES.AUTH.DATABASE}]`,
          ),
        )
        .catch((err) => {
          logger.error(
            `Failed to connect to PostgresDB: ${ENV.POSTGRES.ACCOUNT.HOST} [${ENV.POSTGRES.AUTH.DATABASE}]`,
          );
          throw err;
        }),
    ]);

    if (this.mongoose.connection.readyState === 1)
      logger.info(`Connected to MongoDB: ${ENV.MONGODB.AUTH.HOST} [${ENV.MONGODB.AUTH.DATABASE}]`);
    else if (this.mongoose.connection.readyState === 0)
      logger.error(
        `Unable to connect to MongoDB: ${ENV.MONGODB.AUTH.HOST} [${ENV.MONGODB.AUTH.DATABASE}]`,
      );
  }
}
