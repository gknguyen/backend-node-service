import { Global, Inject, Module, OnModuleInit } from '@nestjs/common';
import ENV from 'src/shared/env';
import { logger } from 'src/shared/logger';
import { DataSource } from 'typeorm';
import { DatabaseDomain } from './shared/database.const';
import { DatabaseProviders } from './shared/database.provider';
import { DatabaseRepositories } from './shared/database.repositories';

@Global()
@Module({
  providers: [...DatabaseProviders, ...DatabaseRepositories],
  exports: [...DatabaseRepositories],
})
export class DatabaseModule implements OnModuleInit {
  constructor(
    @Inject(DatabaseDomain.Auth) private readonly authDataSource: DataSource,
    @Inject(DatabaseDomain.Account) private readonly accountDataSource: DataSource,
  ) {}

  async onModuleInit() {
    await Promise.all([
      this.authDataSource
        .initialize()
        .then(() => logger.info(`Connected to DB: ${ENV.DATABASE.AUTH.DATABASE}`))
        .catch((err) => {
          logger.error(`Failed to connect to DB: ${ENV.DATABASE.AUTH.DATABASE}`);
          throw err;
        }),
      this.accountDataSource
        .initialize()
        .then(() => logger.info(`Connected to DB: ${ENV.DATABASE.ACCOUNT.DATABASE}`))
        .catch((err) => {
          logger.error(`Failed to connect to DB: ${ENV.DATABASE.ACCOUNT.DATABASE}`);
          throw err;
        }),
    ]);
  }
}
