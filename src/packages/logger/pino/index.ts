import pino from 'pino';
import { Request, Response } from 'express';
import format from 'string-template';
import { ILoggerConfig } from './interface';
import { DEFAULT_CONFIG, DEFAULT_REDACT_CONFIG, DEFAULT_TRANSPORT_CONFIG } from './const';
import { getUserId } from '../shared/utils';
import { IBaseLogger, ILogInput } from '../shared/interface';
import { BaseLogger } from '../shared/instance';

export class PinoLogger extends BaseLogger implements IBaseLogger {
  private readonly pinoLogger: pino.Logger;
  private readonly config: ILoggerConfig;

  constructor(config?: ILoggerConfig) {
    super();
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
    this.pinoLogger.info(this.getCommonData(data), this.getCommonMessage(message, data));
  }
  debug(message: string, data?: ILogInput) {
    this.pinoLogger.debug(this.getCommonData(data), this.getCommonMessage(message, data));
  }
  warn(message: string, data?: ILogInput) {
    this.pinoLogger.warn(this.getCommonData(data), this.getCommonMessage(message, data));
  }
  error(message: string, data?: ILogInput) {
    this.pinoLogger.error(this.getCommonData(data), this.getCommonMessage(message, data));
  }
  fatal(message: string, data?: ILogInput) {
    this.pinoLogger.fatal(this.getCommonData(data), this.getCommonMessage(message, data));
  }

  httpLog(req: Request & { timestamp?: number }, res: Response) {
    const elapsedStart = req.timestamp ?? 0;
    const elapsedEnd = Date.now();
    const processTime = format('{0}ms', [elapsedStart > 0 ? elapsedEnd - elapsedStart : 0]);
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
