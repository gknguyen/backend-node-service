import { PinoLogger } from '../pino';
import { WinstonLogger } from '../winston';

export enum LoggerType {
  Pino = 'pino',
  Winston = 'winston',
}

export const LOGGER_TYPE_MAPPER = {
  [LoggerType.Pino]: PinoLogger,
  [LoggerType.Winston]: WinstonLogger,
};
