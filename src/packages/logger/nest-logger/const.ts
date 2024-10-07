import { INestLoggerOptions, INestLoggerRedactOptions } from './interface';

export const DEFAULT_OPTIONS: INestLoggerOptions = {
  level: 'debug',
  enabled: true,
};

export const DEFAULT_REDACT_OPTIONS: INestLoggerRedactOptions = {
  enabled: true,
  censor: '******',
  paths: [],
};
