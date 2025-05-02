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
