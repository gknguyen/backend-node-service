import { IWinstonLoggerOptions, IWinstonLoggerRedactOptions } from './interface';

export const DEFAULT_OPTIONS: IWinstonLoggerOptions = {
  level: 'debug',
  enabled: true,
};

export const DEFAULT_REDACT_OPTIONS: IWinstonLoggerRedactOptions = {
  enabled: true,
  censor: '******',
  paths: [],
};
