import { KafkaJS } from '@confluentinc/kafka-javascript';
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ExternalContextCreator, MetadataScanner, ModulesContainer } from '@nestjs/core';
import { EVENT_SDK_OPTIONS } from '../shared/shared.const';
import { parseStringToJson } from '../shared/shared.utils';
import { EVENT_SDK_KAFKAJS_TOKEN } from './kafkajs.provider';
import { IEventSdkContext, IEventSdkOptions } from './kafkajs.type';
import { SharedConsumer } from '../shared/shared.consumer';

@Injectable()
export class KafkaJSConsumer extends SharedConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly consumer?: KafkaJS.Consumer;
  private readonly runOptions?: KafkaJS.ConsumerRunConfig;

  constructor(
    @Inject(EVENT_SDK_OPTIONS) private readonly options: IEventSdkOptions,
    @Inject(EVENT_SDK_KAFKAJS_TOKEN) private readonly eventSdk: KafkaJS.Kafka,

    protected readonly modulesContainer: ModulesContainer,
    protected readonly metadataScanner: MetadataScanner,
    protected readonly externalContextCreator: ExternalContextCreator,
  ) {
    super(modulesContainer, metadataScanner, externalContextCreator);

    this.runOptions = this.options.run;

    if (this.options.consumer) {
      this.consumer = this.eventSdk.consumer({
        kafkaJS: {
          ...this.options.consumer,
          ...(this.options.client.logger && {
            logger: this.options.client.logger.namespace(KafkaJSConsumer.name),
          }),
        },
      });
    }
  }

  async onModuleInit() {
    if (this.consumer) {
      await this.consumer.connect();

      this.setupSubscriberMap();

      const topics = Array.from(this.subscriberMap.keys());
      await this.consumer.subscribe({ topics: topics });
      await this.consumer.run({
        ...this.runOptions,
        eachMessage: async (payload) => {
          this.handleMessage(payload);
        },
      });
    }
  }

  async onModuleDestroy() {
    if (this.consumer) {
      await this.consumer.disconnect();
    }
  }

  private handleMessage({ topic, partition, message, heartbeat }: KafkaJS.EachMessagePayload) {
    const callbackList = this.subscriberMap.get(topic) || {};
    for (const key in callbackList) {
      const { instance, methodKey } = callbackList[key];
      if (instance && methodKey) {
        const payload = message.value ? parseStringToJson(message.value.toString()) : null;
        const context: IEventSdkContext = {
          topic,
          partition,
          key: message.key ? parseStringToJson(message.key.toString()) : null,
          offset: message.offset,
          headers: message.headers,
          heartbeat,
        };

        const handler = this.getHandler(methodKey, instance);

        handler(payload, context);
      }
    }
  }
}
