import { Logger } from 'src/packages/logger';
import ENV from './env';

export const logger = new Logger({
  level: ENV.PINO.LEVEL,
  enabled: ENV.PINO.ENABLED,
  colorEnabled: ENV.PINO.COLOR_ENABLED,
  prettyEnabled: ENV.PINO.PRETTY_ENABLED,
  redact: {
    paths: ENV.PINO.REDACT.PATHS,
    censor: ENV.PINO.REDACT.CENSOR,
  },
});
