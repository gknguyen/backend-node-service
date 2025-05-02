import { KafkaJS } from '@confluentinc/kafka-javascript';
import { IEmitEvent } from '../shared/shared.type';

export interface IEventSdkOptions {
  client: KafkaJS.KafkaConfig;
  producer?: Omit<KafkaJS.ProducerConfig, keyof KafkaJS.Logger>;
  consumer?: Omit<KafkaJS.ConsumerConfig, keyof KafkaJS.Logger>;
  run?: KafkaJS.ConsumerRunConfig;
}

export interface IEventSdkEmitEvent<T> extends IEmitEvent<T> {
  headers?: KafkaJS.IHeaders;
}

export interface IEventSdkContext {
  topic: string;
  partition: number;
  key?: string | number | null;
  offset: string | number;
  headers?: KafkaJS.IHeaders;
  heartbeat: () => Promise<void>;
}
