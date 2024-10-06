import { PinoLogger } from './pino';
import { LOGGER_TYPE_MAPPER, LoggerType } from './shared/const';
import { IBaseLoggerOptions } from './shared/interface';
import { WinstonLogger } from './winston';

export class Logger {
  options: IBaseLoggerOptions;

  constructor(options: IBaseLoggerOptions) {
    this.options = options;
  }

  get(type: LoggerType.Pino): PinoLogger;
  get(type: LoggerType.Winston): WinstonLogger;
  get(type: LoggerType): PinoLogger | WinstonLogger {
    return new LOGGER_TYPE_MAPPER[type](this.options);
  }
}
