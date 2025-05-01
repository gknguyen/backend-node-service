import { KafkaJS } from '@confluentinc/kafka-javascript';

export interface IEventSdkOptions {
  client: KafkaJS.KafkaConfig;
  producer?: KafkaJS.ProducerConfig;
  consumer?: KafkaJS.ConsumerConfig;
  run?: KafkaJS.ConsumerRunConfig;
}

export interface IEventSdkEmitEvent<T> {
  topic: string;
  key: string;
  data: T;
  headers?: KafkaJS.IHeaders;
}

export interface IEventSdkContext {
  topic: string;
  partition: number;
  key: string | number;
  offset: string | number;
  headers?: KafkaJS.IHeaders;
  heartbeat: () => Promise<void>;
}
