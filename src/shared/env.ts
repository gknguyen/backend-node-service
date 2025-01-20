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
    URL: config.get<string>('rabbitmq.url'),
  },
};

export default ENV;
