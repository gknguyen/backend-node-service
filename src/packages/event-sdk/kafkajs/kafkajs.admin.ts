import { KafkaJS } from '@confluentinc/kafka-javascript';
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { EVENT_SDK_OPTIONS } from '../shared/shared.const';
import { EVENT_SDK_KAFKAJS_TOKEN } from './kafkajs.provider';
import { IEventSdkAdminMiscOptions, IEventSdkOptions } from './kafkajs.type';
import { SharedSubscriber } from '../shared/shared.subscriber';
import { ExternalContextCreator, MetadataScanner, ModulesContainer } from '@nestjs/core';

@Injectable()
export class KafkaJSAdmin extends SharedSubscriber implements OnModuleInit, OnModuleDestroy {
  private readonly admin?: KafkaJS.Admin;
  private readonly miscOptions?: IEventSdkAdminMiscOptions;

  constructor(
    @Inject(EVENT_SDK_OPTIONS) private readonly options: IEventSdkOptions,
    @Inject(EVENT_SDK_KAFKAJS_TOKEN) private readonly eventSdk: KafkaJS.Kafka,

    protected readonly modulesContainer: ModulesContainer,
    protected readonly metadataScanner: MetadataScanner,
    protected readonly externalContextCreator: ExternalContextCreator,
  ) {
    super(modulesContainer, metadataScanner, externalContextCreator);

    if (this.options.admin) {
      const { misc, ...adminOption } = this.options.admin;
      this.miscOptions = misc;
      this.admin = this.eventSdk.admin({
        kafkaJS: {
          ...adminOption,
          ...(this.options.client.logger && {
            logger: this.options.client.logger.namespace(KafkaJSAdmin.name),
          }),
        },
      });
    }
  }

  async onModuleInit() {
    if (this.admin) {
      await this.admin.connect();

      /** allowAutoTopicCreation on consumer config is not work anymore since librdkafka >=1.6.0 */
      if (this.miscOptions?.allowAutoTopicCreation) {
        this.setupSubscriberMap();

        const topics = Array.from(this.subscriberMap.keys());
        await this.admin.createTopics({ topics: topics.map((topic) => ({ topic })) });
      }
    }
  }

  async onModuleDestroy() {
    await this.admin?.disconnect();
  }

  async healthCheck() {
    if (!this.admin) throw new Error('Kafka Admin Client not initialized');
    await this.admin.fetchTopicMetadata();
  }
}
