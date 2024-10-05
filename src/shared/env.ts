require('dotenv').config({ override: process.env.NODE_ENV !== 'test' });

import * as config from 'config';
import { Level } from 'pino';

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
  PINO: {
    LEVEL: config.get<Level>('pino.level'),
    ENABLED: config.get<boolean>('pino.enabled'),
    COLOR_ENABLED: config.get<boolean>('pino.colorEnabled'),
    PRETTY_ENABLED: config.get<boolean>('pino.prettyEnabled'),
    REDACT: {
      ENABLED: config.get<boolean>('pino.redact.enabled'),
      CENSOR: config.get<string>('pino.redact.censor'),
      PATHS: config.get<string[]>('pino.redact.paths') || [],
    },
  },
};

export default ENV;
