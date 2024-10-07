import { NestLogger } from '../nest-logger';
import { PinoLogger } from '../pino';
import { WinstonLogger } from '../winston';

export enum LoggerType {
  Pino = 'pino',
  Winston = 'winston',
  Nest = 'nest',
}

export const LOGGER_TYPE_MAPPER = {
  [LoggerType.Pino]: PinoLogger,
  [LoggerType.Winston]: WinstonLogger,
  [LoggerType.Nest]: NestLogger,
};
