import { KafkaJS } from '@confluentinc/kafka-javascript';
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { EVENT_SDK_OPTIONS } from '../shared/shared.const';
import { EVENT_SDK_KAFKAJS_TOKEN } from './kafkajs.provider';
import { IEventSdkOptions } from './kafkajs.type';
import { SharedSubscriber } from '../shared/shared.subscriber';
import { ExternalContextCreator, MetadataScanner, ModulesContainer } from '@nestjs/core';

@Injectable()
export class KafkaJSAdmin extends SharedSubscriber implements OnModuleInit, OnModuleDestroy {
  private readonly admin: KafkaJS.Admin;

  constructor(
    @Inject(EVENT_SDK_OPTIONS) private readonly options: IEventSdkOptions,
    @Inject(EVENT_SDK_KAFKAJS_TOKEN) private readonly eventSdk: KafkaJS.Kafka,

    protected readonly modulesContainer: ModulesContainer,
    protected readonly metadataScanner: MetadataScanner,
    protected readonly externalContextCreator: ExternalContextCreator,
  ) {
    super(modulesContainer, metadataScanner, externalContextCreator);

    this.admin = this.eventSdk.admin(
      this.options.client.logger
        ? {
            kafkaJS: {
              logger: this.options.client.logger.namespace(KafkaJSAdmin.name),
            },
          }
        : undefined,
    );
  }

  async onModuleInit() {
    await this.admin.connect();

    /** allowAutoTopicCreation on consumer config is not work anymore since librdkafka >=1.6.0 */
    if (this.options.consumer?.allowAutoTopicCreation) {
      this.setupSubscriberMap();

      const topics = Array.from(this.subscriberMap.keys());
      const isCreated = await this.admin.createTopics({
        topics: topics.map((topic) => ({ topic })),
      });
      if (isCreated) this.options.client.logger?.info('Topics initialized');
    }
  }

  async onModuleDestroy() {
    await this.admin.disconnect();
  }

  async healthCheck() {
    await this.admin.fetchTopicMetadata();
  }
}
