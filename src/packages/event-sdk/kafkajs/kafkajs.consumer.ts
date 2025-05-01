import { KafkaJS } from '@confluentinc/kafka-javascript';
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ExternalContextCreator, MetadataScanner, ModulesContainer } from '@nestjs/core';
import { EVENT_SDK_CONSUMER_METADATA, EVENT_SDK_OPTIONS } from '../event-sdk.const';
import { parseStringToJson } from '../event-sdk.utils';
import { EVENT_SDK_KAFKAJS_TOKEN } from './kafkajs.provider';
import { IEventSdkContext, IEventSdkOptions } from './kafkajs.type';

@Injectable()
export class KafkaJSConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly consumer?: KafkaJS.Consumer;
  private readonly runOptions?: KafkaJS.ConsumerRunConfig;
  private readonly subscriberMap = new Map<
    string,
    {
      [index: string]: {
        instance: Record<string, (...args: any[]) => any>;
        methodKey: string;
      };
    }
  >();

  constructor(
    @Inject(EVENT_SDK_OPTIONS) private readonly options: IEventSdkOptions,
    @Inject(EVENT_SDK_KAFKAJS_TOKEN) private readonly eventSdk: KafkaJS.Kafka,

    private readonly modulesContainer: ModulesContainer,
    private readonly metadataScanner: MetadataScanner,
    private readonly externalContextCreator: ExternalContextCreator,
  ) {
    this.runOptions = this.options.run;

    if (this.options.consumer) {
      this.consumer = this.eventSdk.consumer({
        kafkaJS: this.options.consumer,
      });
    }
  }

  async onModuleInit() {
    if (this.consumer) {
      await this.consumer.connect();

      const modules = this.modulesContainer.values();
      for (const nestModule of Array.from(modules)) {
        nestModule.controllers.forEach((controller) => {
          const { instance } = controller;
          const instancePrototype = Object.getPrototypeOf(instance);
          const methodKeys = this.metadataScanner.getAllMethodNames(instancePrototype);

          for (const methodKey of methodKeys) {
            const targetCallback = instancePrototype[methodKey];

            const topic = this.getSubscribeMetadata(targetCallback);
            if (topic) {
              const callbackList = this.subscriberMap.get(topic) || {};
              callbackList[Object.keys(callbackList).length] = {
                instance: instance as any,
                methodKey,
              };
              this.subscriberMap.set(topic, callbackList);
            }
          }
        });
      }

      const topics = Array.from(this.subscriberMap.keys());
      await this.consumer.subscribe({ topics: topics });
      await this.consumer.run({
        ...this.runOptions,
        eachMessage: async ({ topic, partition, message, heartbeat }) => {
          const callbackList = this.subscriberMap.get(topic) || {};
          for (const key in callbackList) {
            const { instance, methodKey } = callbackList[key];
            if (instance && methodKey) {
              // console.log(message.value?.toString('utf8'));
              const payload = message.value ? parseStringToJson(message.value.toString()) : null;
              const context: IEventSdkContext = {
                topic,
                partition,
                key: message.key ? JSON.parse(message.key.toString()) : null,
                offset: message.offset,
                headers: message.headers,
                heartbeat,
              };

              const handler = this.externalContextCreator.create(
                instance,
                instance[methodKey],
                methodKey,
                undefined,
                undefined,
                undefined,
                undefined,
                { guards: true, interceptors: true, filters: true },
                'kafka',
              );

              handler(payload, context);
            }
          }
        },
      });
    }
  }

  async onModuleDestroy() {
    if (this.consumer) {
      await this.consumer.disconnect();
    }
  }

  private getSubscribeMetadata(callback: (...args: any[]) => any): string {
    return Reflect.getMetadata(EVENT_SDK_CONSUMER_METADATA, callback);
  }
}
