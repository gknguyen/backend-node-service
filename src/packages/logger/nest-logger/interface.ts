export interface INestLoggerRedactOptions {
  enabled?: boolean;
  paths: string[];
  censor?: string;
}

export interface INestLoggerOptions {
  level?: string;
  enabled?: boolean;
  colorEnabled?: boolean;
  prettyEnabled?: boolean;
  redact?: INestLoggerRedactOptions;
}
