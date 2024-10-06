import pino from 'pino';
import { IBaseLogger, ILogInput } from '../shared/interface';
import { DEFAULT_CONFIG, DEFAULT_REDACT_CONFIG, DEFAULT_TRANSPORT_CONFIG } from './const';
import { ILoggerConfig } from './interface';
import { getCommonData } from '../shared/utils';

export class PinoLogger implements IBaseLogger {
  private readonly pinoLogger: pino.Logger;
  private readonly config: ILoggerConfig;

  constructor(config?: ILoggerConfig) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
      ...((config?.redact?.enabled ?? DEFAULT_REDACT_CONFIG.enabled) && {
        redact: {
          ...DEFAULT_REDACT_CONFIG,
          ...config?.redact,
        },
      }),
      ...(config?.prettyEnabled && {
        transport: {
          ...DEFAULT_TRANSPORT_CONFIG,
          ...config?.transport,
          options: {
            ...DEFAULT_TRANSPORT_CONFIG.options,
            ...config?.transport?.options,
            ...(config?.colorEnabled && { colorize: config.colorEnabled }),
          },
        },
      }),
    };
    this.pinoLogger = pino(this.config);
  }

  private getCommonMessage(message: string, data?: ILogInput) {
    return data && this.config.prettyEnabled ? `${message} |` : message;
  }

  info(message: string, data?: ILogInput) {
    this.pinoLogger.info(getCommonData(data), this.getCommonMessage(message, data));
  }
  debug(message: string, data?: ILogInput) {
    this.pinoLogger.debug(getCommonData(data), this.getCommonMessage(message, data));
  }
  warn(message: string, data?: ILogInput) {
    this.pinoLogger.warn(getCommonData(data), this.getCommonMessage(message, data));
  }
  error(message: string, data?: ILogInput) {
    this.pinoLogger.error(getCommonData(data), this.getCommonMessage(message, data));
  }
  fatal(message: string, data?: ILogInput) {
    this.pinoLogger.fatal(getCommonData(data), this.getCommonMessage(message, data));
  }
}
