import { KafkaJS } from '@confluentinc/kafka-javascript';
import { IContext, IEmitEvent } from '../shared/shared.type';

export interface IEventSdkOptions {
  client: KafkaJS.KafkaConfig;
  producer?: Omit<KafkaJS.ProducerConfig, keyof KafkaJS.Logger>;
  consumer?: Omit<KafkaJS.ConsumerConfig, keyof KafkaJS.Logger>;
  admin?: Omit<KafkaJS.AdminConfig & { misc?: IEventSdkAdminMiscOptions }, keyof KafkaJS.Logger>;
  run?: KafkaJS.ConsumerRunConfig;
}

export interface IEventSdkEmitEvent<T> extends IEmitEvent<T> {
  headers?: KafkaJS.IHeaders;
}

export interface IEventSdkContext extends IContext {
  key?: string | number | null;
  headers?: KafkaJS.IHeaders;
  heartbeat: () => Promise<void>;
}

export interface IEventSdkAdminMiscOptions {
  allowAutoTopicCreation?: boolean;
}
