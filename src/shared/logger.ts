import ENV from './env';
import { Logger } from 'src/packages/logger';
import { LoggerType } from 'src/packages/logger/shared/const';

export const logger = new Logger(LoggerType.Pino, {
  enabled: ENV.LOGGER.ENABLED,
  colorEnabled: ENV.LOGGER.COLOR_ENABLED,
  prettyEnabled: ENV.LOGGER.PRETTY_ENABLED,
  redact: {
    enabled: ENV.LOGGER.REDACT.ENABLED,
    paths: ENV.LOGGER.REDACT.PATHS,
    censor: ENV.LOGGER.REDACT.CENSOR,
  },
});
