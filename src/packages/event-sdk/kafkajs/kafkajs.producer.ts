import { KafkaJS } from '@confluentinc/kafka-javascript';
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { EVENT_SDK_OPTIONS } from '../shared/shared.const';
import { IEventSdkProducer } from '../shared/shared.type';
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
      this.options.producer
        ? {
            kafkaJS: {
              ...this.options.producer,
              ...(this.options.client.logger && {
                logger: this.options.client.logger.namespace(KafkaJSProducer.name),
              }),
            },
          }
        : undefined,
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
