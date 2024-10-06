import { addColors, createLogger, format, Logger, transports } from 'winston';
import { IBaseLogger, ILogInput } from '../shared/interface';
import { BaseLogger } from '../shared/instance';
import { IWinstonLoggerOptions } from './interface';
import { Format } from 'logform';
import { DEFAULT_OPTIONS, DEFAULT_REDACT_OPTIONS } from './const';
import { Request, Response } from 'express';
import { getUserId } from '../shared/utils';
import stringTemplateFormat from 'string-template';

export class WinstonLogger extends BaseLogger implements IBaseLogger {
  logger: Logger;
  options: IWinstonLoggerOptions;

  constructor(options?: IWinstonLoggerOptions) {
    super();

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
    this.logger.info(message, this.getCommonData({ data }));
  }
  debug(message: string, data?: ILogInput) {
    this.logger.debug(message, this.getCommonData({ data }));
  }
  warn(message: string, data?: ILogInput) {
    this.logger.warn(message, this.getCommonData({ data }));
  }
  error(message: string, data?: ILogInput) {
    this.logger.error(message, this.getCommonData({ data }));
  }
  fatal(message: string, data?: ILogInput) {
    this.logger.crit(message, this.getCommonData({ data }));
  }

  httpLog(req: Request & { timestamp?: number }, res: Response) {
    const elapsedStart = req.timestamp ?? 0;
    const elapsedEnd = Date.now();
    const processTime = stringTemplateFormat('{0}ms', [
      elapsedStart > 0 ? elapsedEnd - elapsedStart : 0,
    ]);
    res.setHeader('x-process-time', processTime);

    const rawResponse = res.write;
    const rawResponseEnd = res.end;
    const chunks: Buffer[] = [];

    res.write = (...args: any[]) => {
      const restArgs: any = [];
      for (let i = 0; i < args.length; i++) restArgs[i] = args[i];
      chunks.push(Buffer.from(restArgs[0]));
      rawResponse.apply(res, restArgs);
      return true;
    };

    res.end = (...args: any[]) => {
      const restArgs: any = [];
      for (let i = 0; i < args.length; i++) restArgs[i] = args[i];
      if (restArgs[0]) chunks.push(Buffer.from(restArgs[0]));
      const body = Buffer.concat(chunks).toString('utf8');
      const payload = {
        userId: getUserId(),
        timestamp: new Date().toISOString(),
        processTime,
        request: {
          headers: req.headers,
          body: req.body,
          clientIP: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
          userAgent: req.headers['user-agent'],
          originalUri: req.originalUrl,
          uri: req.url,
          method: req.method,
        },
        response: {
          headers: res.getHeaders(),
          body: this.formatResBodyString(body),
          statusCode: res.statusCode,
        },
      };
      if (res.statusCode >= 200 && res.statusCode <= 400)
        this.debug(`HTTP Success Log [${res.statusCode}]`, payload);
      else this.error(`HTTP Error Log [${res.statusCode}]`, payload);
      rawResponseEnd.apply(res, restArgs);
      return res;
    };
  }
}
