import { Logger } from '@nestjs/common';
import { IBaseLogger, ILogInput } from '../shared/interface';
import { INestLoggerOptions } from './interface';
import { DEFAULT_REDACT_OPTIONS } from './const';

export class NestLogger implements IBaseLogger {
  private readonly logger: Logger;
  private readonly options: INestLoggerOptions;

  constructor(options?: INestLoggerOptions) {
    this.options = { ...options };
    this.logger = new Logger(NestLogger.name);
  }

  private censorData(data?: ILogInput) {
    const censorKeys = this.options?.redact?.paths || DEFAULT_REDACT_OPTIONS.paths;
    censorKeys.forEach((key) => {
      if (data && Object.keys(data).includes(key))
        data[key] = this.options?.redact?.censor ?? DEFAULT_REDACT_OPTIONS.censor;
    });
    return data;
  }

  private getCommonMessage(message: string, data?: ILogInput) {
    return [
      message,
      data
        ? JSON.stringify(this.options.redact?.enabled ? this.censorData(data) : data)
        : undefined,
    ]
      .filter(Boolean)
      .join(' | ');
  }

  info(message: string, data?: ILogInput) {
    this.logger.log(this.getCommonMessage(message, data));
  }
  debug(message: string, data?: ILogInput) {
    this.logger.debug(this.getCommonMessage(message, data));
  }
  warn(message: string, data?: ILogInput) {
    this.logger.warn(this.getCommonMessage(message, data));
  }
  error(message: string, data?: ILogInput) {
    this.logger.error(this.getCommonMessage(message, data));
  }
  fatal(message: string, data?: ILogInput) {
    this.logger.fatal(this.getCommonMessage(message, data));
  }
}
