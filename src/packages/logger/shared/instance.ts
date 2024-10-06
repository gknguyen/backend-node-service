import { ILogInput } from './interface';
import { serializedError } from './utils';

export abstract class BaseLogger {
  getCommonData(data?: ILogInput) {
    return data
      ? {
          env: process.env.NODE_ENV,
          ...serializedError(data),
        }
      : undefined;
  }

  formatResBodyString(body: string) {
    return body.replace(/\\"/g, '');
  }
}
