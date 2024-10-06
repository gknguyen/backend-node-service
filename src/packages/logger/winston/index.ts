import { Format } from 'logform';
import { addColors, createLogger, format, Logger, transports } from 'winston';
import { IBaseLogger, ILogInput } from '../shared/interface';
import { getCommonData } from '../shared/utils';
import { DEFAULT_OPTIONS, DEFAULT_REDACT_OPTIONS } from './const';
import { IWinstonLoggerOptions } from './interface';

export class WinstonLogger implements IBaseLogger {
  logger: Logger;
  options: IWinstonLoggerOptions;

  constructor(options?: IWinstonLoggerOptions) {
    if (options?.colorEnabled)
      addColors({
        info: 'cyan',
        warn: 'yellow',
        error: 'red',
      });

    const FORMAT: Format[] = [
      format.timestamp({ format: 'DD/MM/YYYY, h:mm:ss A' }),
      format.label({ label: '[Server]' }),
    ];

    if (options?.redact?.enabled ?? DEFAULT_REDACT_OPTIONS.enabled)
      FORMAT.push(
        format((info) => {
          const censorKeys = options?.redact?.paths || DEFAULT_REDACT_OPTIONS.paths;
          censorKeys.forEach((key) => {
            if (info.data && Object.keys(info.data).includes(key))
              info.data[key] = options?.redact?.censor ?? DEFAULT_REDACT_OPTIONS.censor;
          });
          return info;
        })(),
      );

    if (options?.prettyEnabled)
      FORMAT.push(
        format.printf(({ label, timestamp, level, message, data }) => {
          const textDisplay = [
            `${label}      - ${timestamp},    ${level.toUpperCase()} ${message}`,
            data ? JSON.stringify(data) : undefined,
          ]
            .filter(Boolean)
            .join(' | ');
          return options?.colorEnabled
            ? format.colorize().colorize(level, textDisplay)
            : textDisplay;
        }),
      );
    else FORMAT.push(format.json());

    this.logger = createLogger({
      level: options?.level ?? DEFAULT_OPTIONS.level,
      silent: !(options?.enabled ?? DEFAULT_OPTIONS.enabled),
      format: format.combine(...FORMAT),
      transports: [new transports.Console()],
    });
  }

  info(message: string, data?: ILogInput) {
    this.logger.info(message, getCommonData({ data }));
  }
  debug(message: string, data?: ILogInput) {
    this.logger.debug(message, getCommonData({ data }));
  }
  warn(message: string, data?: ILogInput) {
    this.logger.warn(message, getCommonData({ data }));
  }
  error(message: string, data?: ILogInput) {
    this.logger.error(message, getCommonData({ data }));
  }
  fatal(message: string, data?: ILogInput) {
    this.logger.crit(message, getCommonData({ data }));
  }
}
