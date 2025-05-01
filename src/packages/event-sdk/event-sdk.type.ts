export * as IKafkaJS from './kafkajs/kafkajs.type';

export interface IEventSdkEmitEvent<T> {
  topic: string;
  key: string;
  data: T;
}

export interface IEventSdkProducer {
  emit<T>(payload: IEventSdkEmitEvent<T>): Promise<any>;
}
