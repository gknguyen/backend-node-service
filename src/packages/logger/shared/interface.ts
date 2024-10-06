export interface ILogInput {
  methodName?: string;
  [x: string]: any;
}

export interface IBaseLogger {
  info(message: string, data?: ILogInput): void;
  debug(message: string, data?: ILogInput): void;
  warn(message: string, data?: ILogInput): void;
  error(message: string, data?: ILogInput): void;
  fatal(message: string, data?: ILogInput): void;
}

export interface IBaseLoggerRedactOptions {
  enabled?: boolean;
  paths: string[];
  censor?: string;
}

export interface IBaseLoggerOptions {
  level?: string;
  enabled?: boolean;
  colorEnabled?: boolean;
  prettyEnabled?: boolean;
  redact?: IBaseLoggerRedactOptions;
}
