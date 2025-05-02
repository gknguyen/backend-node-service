import { Request, Response } from 'express';
import * as format from 'string-template';
import { LOGGER_TYPE_MAPPER, LoggerType } from './shared/const';
import { IBaseLogger, IBaseLoggerOptions, IKafkaLogContext, ILogInput } from './shared/interface';
import { formatResBodyString, getUserId } from './shared/utils';

export class Logger implements IBaseLogger {
  logger: IBaseLogger;
  options: IBaseLoggerOptions;

  constructor(type: LoggerType, options: IBaseLoggerOptions) {
    this.options = options;
    this.logger = new LOGGER_TYPE_MAPPER[type](this.options);
  }

  info(message: string, data?: ILogInput): void {
    this.logger.info(message, data);
  }
  debug(message: string, data?: ILogInput): void {
    this.logger.debug(message, data);
  }
  warn(message: string, data?: ILogInput): void {
    this.logger.warn(message, data);
  }
  error(message: string, data?: ILogInput): void {
    this.logger.error(message, data);
  }
  fatal(message: string, data?: ILogInput): void {
    this.logger.fatal(message, data);
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
          body: formatResBodyString(body),
          statusCode: res.statusCode,
        },
      };
      if (res.statusCode >= 200 && res.statusCode < 400)
        this.info(`HTTP Success Log [${res.statusCode}]`, payload);
      else this.error(`HTTP Error Log [${res.statusCode}]`, payload);
      rawResponseEnd.apply(res, restArgs);
      return res;
    };
  }

  httpRequestLog(req: Request) {
    const payload = {
      userId: getUserId(),
      timestamp: new Date().toISOString(),
      headers: req.headers,
      body: req.body,
      clientIP: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
      originalUri: req.originalUrl,
      uri: req.url,
      method: req.method,
    };
    this.info(`HTTP Incoming Request`, payload);
  }

  httpResponseLog(res: Response) {
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
        headers: res.getHeaders(),
        body: formatResBodyString(body),
        statusCode: res.statusCode,
      };
      const message = `HTTP Outgoing Response [${res.statusCode}]`;
      if (res.statusCode >= 200 && res.statusCode < 400) this.info(message, payload);
      else this.error(message, payload);
      rawResponseEnd.apply(res, restArgs);
      return res;
    };
  }

  kafkaRequestLog(context: IKafkaLogContext) {
    this.info(`Kafka Incoming Request`, context);
  }

  kafkaResponseLog(context: IKafkaLogContext) {
    this.info(`Kafka Outgoing Response`, context);
  }
}
