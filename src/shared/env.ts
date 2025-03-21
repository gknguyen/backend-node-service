require('dotenv').config({ override: process.env.NODE_ENV !== 'test' });

import * as config from 'config';

const ENV = {
  SERVICE: {
    NAME: config.get<string>('service.name'),
    DESCRIPTION: config.get<string>('service.description'),
    HOST: config.get<string>('service.host'),
    PORT: process.env.PORT || config.get<number>('service.port'),
    PROTOCOL: config.get<string>('service.protocol'),
    BASE_URL: config.get<string>('service.baseUrl'),
    DOCS_URL: config.get<string>('service.docsUrl'),
  },
  LOGGER: {
    LEVEL: config.get<string>('logger.level'),
    ENABLED: config.get<boolean>('logger.enabled'),
    COLOR_ENABLED: config.get<boolean>('logger.colorEnabled'),
    PRETTY_ENABLED: config.get<boolean>('logger.prettyEnabled'),
    REDACT: {
      ENABLED: config.get<boolean>('logger.redact.enabled'),
      CENSOR: config.get<string>('logger.redact.censor'),
      PATHS: config.get<string[]>('logger.redact.paths') || [],
    },
  },
  PAYMENT_GATEWAY: {
    STRIPE: {
      PUBLIC_KEY: config.get<string>('paymentGateway.stripe.publicKey'),
      SECRET_KEY: config.get<string>('paymentGateway.stripe.secretKey'),
      TEST_MODE: config.get<boolean>('paymentGateway.stripe.testMode'),
    },
  },
  RABBITMQ: {
    URI: config.get<string>('rabbitmq.uri'),
  },
  KAFKA: {
    BROKER: config.get<string>('kafka.broker'),
  },
  POSTGRES: {
    AUTH: {
      HOST: config.get<string>('postgres.auth.host'),
      PORT: config.get<number>('postgres.auth.port'),
      USERNAME: config.get<string>('postgres.auth.user'),
      PASSWORD: config.get<string>('postgres.auth.password'),
      DATABASE: config.get<string>('postgres.auth.database'),
      SCHEMA: config.get<string>('postgres.auth.schema'),
      CONNECTION_TIMEOUT: config.get<number>('postgres.auth.connectionTimeout'),
      MAX_QUERY_EXECUTION_TIME: config.get<number>('postgres.auth.maxQueryExecutionTime'),
      POOL_SIZE: config.get<number>('postgres.auth.poolSize'),
      MIGRATIONS_RUN: config.get<boolean>('postgres.auth.migrationsRun'),
    },
    ACCOUNT: {
      HOST: config.get<string>('postgres.account.host'),
      PORT: config.get<number>('postgres.account.port'),
      USERNAME: config.get<string>('postgres.account.user'),
      PASSWORD: config.get<string>('postgres.account.password'),
      DATABASE: config.get<string>('postgres.account.database'),
      SCHEMA: config.get<string>('postgres.account.schema'),
      CONNECTION_TIMEOUT: config.get<number>('postgres.account.connectionTimeout'),
      MAX_QUERY_EXECUTION_TIME: config.get<number>('postgres.account.maxQueryExecutionTime'),
      POOL_SIZE: config.get<number>('postgres.account.poolSize'),
      MIGRATIONS_RUN: config.get<boolean>('postgres.account.migrationsRun'),
    },
  },
  MONGODB: {
    AUTH: {
      HOST: config.get<string>('mongodb.auth.host'),
      PORT: config.get<number>('mongodb.auth.port'),
      USERNAME: config.get<string>('mongodb.auth.user'),
      PASSWORD: config.get<string>('mongodb.auth.password'),
      DATABASE: config.get<string>('mongodb.auth.database'),
      DIRECT_CONNECTION: config.get<boolean>('mongodb.auth.directConnection'),
    },
  },
  DATA_MODEL: {
    USER_SESSION: {
      DELETE_AT: config.get<number>('dataModel.userSession.deleteAt'),
    },
  },
  JWT: {
    SECRET: config.get<string>('jwt.secret'),
    EXPIRES_IN: config.get<string>('jwt.expiresIn'),
  },
};

export default ENV;
