import { KafkaJS } from '@confluentinc/kafka-javascript';

export type Logger = KafkaJS.Logger;

export interface IEmitEvent<T> {
  topic: string;
  key: string;
  data: T;
}

export interface IEventSdkProducer {
  emit<T>(payload: IEmitEvent<T>): Promise<any>;
}

export interface IContext {
  topic: string;
  partition: number;
  offset: string | number;
}

export interface IRetryWithBackoffOptions {
  retries: number;
  backoffInterval: number;
  timeout: number;
  logger: Logger;
}

export interface IEventSdkAdmin {
  healthCheck(): Promise<void>;
}
