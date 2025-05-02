import { RdKafka } from '@confluentinc/kafka-javascript';
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ExternalContextCreator, MetadataScanner, ModulesContainer } from '@nestjs/core';
import { EVENT_SDK_OPTIONS } from '../shared/shared.const';
import { parseStringToJson } from '../shared/shared.utils';
import { Logger } from '../shared/shared.type';
import { IEventSdkContext, IEventSdkOptions } from './rdkafka.type';
import { SharedConsumer } from '../shared/shared.consumer';

@Injectable()
export class RdKafkaConsumer extends SharedConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly consumer?: RdKafka.KafkaConsumer;
  private readonly logger: Logger;

  constructor(
    @Inject(EVENT_SDK_OPTIONS) private readonly options: IEventSdkOptions,
    protected readonly modulesContainer: ModulesContainer,
    protected readonly metadataScanner: MetadataScanner,
    protected readonly externalContextCreator: ExternalContextCreator,
  ) {
    super(modulesContainer, metadataScanner, externalContextCreator);

    this.logger = this.options.logger.namespace(
      RdKafkaConsumer.name,
      this.options.consumer?.log_level,
    );

    if (this.options.consumer) {
      this.consumer = new RdKafka.KafkaConsumer(
        { ...this.options.client, ...this.options.consumer },
        this.options.consumerTopic,
      );

      this.consumer.on('event.log', (log) => {
        this.logger.debug(`${log.fac}: ${log.message}`);
      });
      this.consumer.on('event.error', (err) => {
        this.logger.error(`Error:`, err);
      });
      this.consumer.on('ready', () => {
        this.logger.info(`Connected to Kafka consumer`);
        this.consumerSubscription();
      });
      this.consumer.on('data', (message) => {
        this.handleMessage(message);
      });
    }
  }

  onModuleInit() {
    if (this.consumer) {
      this.consumer.connect();
    }
  }

  onModuleDestroy() {
    if (this.consumer) {
      this.consumer.disconnect();
    }
  }

  private consumerSubscription() {
    if (this.consumer) {
      this.setupSubscriberMap();

      const topics = Array.from(this.subscriberMap.keys());
      this.consumer.subscribe(topics);
      this.consumer.consume();
    }
  }

  private handleMessage({ topic, partition, value, offset, headers, key }: RdKafka.Message) {
    const callbackList = this.subscriberMap.get(topic) || {};
    for (const callbackKey in callbackList) {
      const { instance, methodKey } = callbackList[callbackKey];
      if (instance && methodKey) {
        const payload = value ? parseStringToJson(value.toString()) : null;
        const context: IEventSdkContext = {
          topic,
          partition,
          key,
          offset,
          headers,
        };

        const handler = this.getHandler(methodKey, instance);

        handler(payload, context);
      }
    }
  }
}
