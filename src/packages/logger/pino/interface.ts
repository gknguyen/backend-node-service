export interface ILoggerRedactConfig {
  enabled?: boolean;
  paths: string[];
  censor?: string;
}

export interface ILoggerTransportConfig {
  target: string;
  options?: {
    colorize?: boolean;
    singleLine?: boolean;
    ignore?: string;
    translateTime?: string;
  };
}

export interface ILoggerConfig {
  level?: string;
  enabled?: boolean;
  colorEnabled?: boolean;
  prettyEnabled?: boolean;
  redact?: ILoggerRedactConfig;
  transport?: ILoggerTransportConfig;
}
