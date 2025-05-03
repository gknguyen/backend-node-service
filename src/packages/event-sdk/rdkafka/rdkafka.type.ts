import { RdKafka } from '@confluentinc/kafka-javascript';
import { IContext, IEmitEvent, Logger } from '../shared/shared.type';

export interface IEventSdkOptions {
  client: RdKafka.GlobalConfig;
  producer?: Omit<
    RdKafka.ProducerGlobalConfig,
    keyof Omit<RdKafka.GlobalConfig, 'debug' | 'log_level'>
  >;
  producerTopic?: RdKafka.ProducerTopicConfig;
  consumer?: Omit<
    RdKafka.ConsumerGlobalConfig,
    keyof Omit<RdKafka.GlobalConfig, 'debug' | 'log_level'>
  >;
  consumerTopic?: RdKafka.ConsumerTopicConfig;
  logger: Logger;
}

export interface IEventSdkEmitEvent<T> extends IEmitEvent<T> {
  headers?: RdKafka.MessageHeader[];
}

export interface IEventSdkContext extends IContext {
  key: RdKafka.MessageKey;
  headers?: RdKafka.MessageHeader[];
}
