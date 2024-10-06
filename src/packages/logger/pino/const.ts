import { ILoggerConfig, ILoggerRedactConfig, ILoggerTransportConfig } from './interface';

export const DEFAULT_CONFIG: ILoggerConfig = {
  level: 'debug',
  enabled: true,
};

export const DEFAULT_REDACT_CONFIG: ILoggerRedactConfig = {
  enabled: true,
  censor: '******',
  paths: [],
};

export const DEFAULT_TRANSPORT_CONFIG: ILoggerTransportConfig = {
  target: 'pino-pretty',
  options: {
    colorize: true,
    singleLine: true,
    ignore: 'hostname,pid',
    translateTime: 'dd/mm/yyyy HH:MM:ss.l',
  },
};
