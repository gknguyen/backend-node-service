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
  DATABASE: {
    AUTH: {
      HOST: config.get<string>('database.auth.host'),
      PORT: config.get<number>('database.auth.port'),
      USERNAME: config.get<string>('database.auth.user'),
      PASSWORD: config.get<string>('database.auth.password'),
      DATABASE: config.get<string>('database.auth.database'),
      SCHEMA: config.get<string>('database.auth.schema'),
      CONNECTION_TIMEOUT: config.get<number>('database.auth.connectionTimeout'),
      MAX_QUERY_EXECUTION_TIME: config.get<number>('database.auth.maxQueryExecutionTime'),
      POOL_SIZE: config.get<number>('database.auth.poolSize'),
    },
    ACCOUNT: {
      HOST: config.get<string>('database.account.host'),
      PORT: config.get<number>('database.account.port'),
      USERNAME: config.get<string>('database.account.user'),
      PASSWORD: config.get<string>('database.account.password'),
      DATABASE: config.get<string>('database.account.database'),
      SCHEMA: config.get<string>('database.account.schema'),
      CONNECTION_TIMEOUT: config.get<number>('database.account.connectionTimeout'),
      MAX_QUERY_EXECUTION_TIME: config.get<number>('database.account.maxQueryExecutionTime'),
      POOL_SIZE: config.get<number>('database.account.poolSize'),
    },
  },
};

export default ENV;
