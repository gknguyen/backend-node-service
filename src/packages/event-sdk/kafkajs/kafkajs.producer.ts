import { KafkaJS } from '@confluentinc/kafka-javascript';
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { EVENT_SDK_OPTIONS } from '../event-sdk.const';
import { IEventSdkProducer } from '../event-sdk.type';
import { EVENT_SDK_KAFKAJS_TOKEN } from './kafkajs.provider';
import { IEventSdkEmitEvent, IEventSdkOptions } from './kafkajs.type';

@Injectable()
export class KafkaJSProducer implements IEventSdkProducer, OnModuleInit, OnModuleDestroy {
  private readonly producer: KafkaJS.Producer;

  constructor(
    @Inject(EVENT_SDK_OPTIONS) private readonly options: IEventSdkOptions,
    @Inject(EVENT_SDK_KAFKAJS_TOKEN) private readonly eventSdk: KafkaJS.Kafka,
  ) {
    this.producer = this.eventSdk.producer(
      this.options.producer ? { kafkaJS: this.options.producer } : undefined,
    );
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async emit<T>(payload: IEventSdkEmitEvent<T>) {
    return this.producer.send({
      topic: payload.topic,
      messages: [
        {
          key: payload.key,
          value: JSON.stringify(payload.data),
          headers: payload.headers,
        },
      ],
    });
  }
}
