export interface IWinstonLoggerRedactOptions {
  enabled?: boolean;
  paths: string[];
  censor?: string;
}

export interface IWinstonLoggerOptions {
  level?: string;
  enabled?: boolean;
  colorEnabled?: boolean;
  prettyEnabled?: boolean;
  redact?: IWinstonLoggerRedactOptions;
}
