import { KafkaJS } from '@confluentinc/kafka-javascript';
import { EventSdk, IKafka } from 'src/packages/event-sdk';
import { Logger } from 'src/packages/logger';
import { LoggerType } from 'src/packages/logger/shared/const';
import ENV from './env';

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

class EventSdkLogger implements IKafka.Logger {
  private currentLogLevel: KafkaJS.logLevel;
  private ns: string;

  constructor(namespace = 'root', level = EventSdk.LogLevel.INFO) {
    this.ns = namespace;
    this.currentLogLevel = level;
  }

  private shouldLog(level: KafkaJS.logLevel): boolean {
    return level <= this.currentLogLevel;
  }

  private log(
    method: 'info' | 'warn' | 'error' | 'debug',
    level: KafkaJS.logLevel,
    message: string,
    extra?: object,
  ) {
    if (!this.shouldLog(level)) return;
    logger[method](`[${this.ns}] ${message}`, extra);
  }

  info(message: string, extra?: object) {
    this.log('info', EventSdk.LogLevel.INFO, message, extra);
  }

  error(message: string, extra?: object) {
    this.log('error', EventSdk.LogLevel.ERROR, message, extra);
  }

  warn(message: string, extra?: object) {
    this.log('warn', EventSdk.LogLevel.WARN, message, extra);
  }

  debug(message: string, extra?: object) {
    this.log('debug', EventSdk.LogLevel.DEBUG, message, extra);
  }

  namespace(namespace: string, logLevel?: KafkaJS.logLevel): IKafka.Logger {
    return new EventSdkLogger(namespace, logLevel ?? this.currentLogLevel);
  }

  setLogLevel(level: KafkaJS.logLevel) {
    this.currentLogLevel = level;
  }
}

export const eventSdkLogger = new EventSdkLogger();
