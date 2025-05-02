import { DynamicModule, Module } from '@nestjs/common';
import { MetadataScanner } from '@nestjs/core';
import {
  EVENT_SDK_CONSUMER_TOKEN,
  EVENT_SDK_OPTIONS,
  EVENT_SDK_PRODUCER_TOKEN,
} from './event-sdk.const';
import { IKafkaJS, IRdKafka } from './event-sdk.type';
import { KafkaJSConsumer } from './kafkajs/kafkajs.consumer';
import { KafkaJSProducer } from './kafkajs/kafkajs.producer';
import { getKafkaJsProvider } from './kafkajs/kafkajs.provider';
import { RdKafkaConsumer } from './rdkafka/rdkafka.consumer';
import { RdKafkaProducer } from './rdkafka/rdkafka.producer';

@Module({})
export class EventSdkModule {
  static forKafkajs(
    options: IKafkaJS.IEventSdkOptions,
    { isGlobal = true }: { isGlobal?: boolean } = {},
  ): DynamicModule {
    const provider = getKafkaJsProvider(options);
    return {
      global: isGlobal,
      module: EventSdkModule,
      providers: [
        provider,
        MetadataScanner,
        { provide: EVENT_SDK_OPTIONS, useValue: options },
        { provide: EVENT_SDK_PRODUCER_TOKEN, useClass: KafkaJSProducer },
        { provide: EVENT_SDK_CONSUMER_TOKEN, useClass: KafkaJSConsumer },
      ],
      exports: [EVENT_SDK_PRODUCER_TOKEN, EVENT_SDK_CONSUMER_TOKEN],
    };
  }

  static forRdKafka(
    options: IRdKafka.IEventSdkOptions,
    { isGlobal = true }: { isGlobal?: boolean } = {},
  ): DynamicModule {
    return {
      global: isGlobal,
      module: EventSdkModule,
      providers: [
        MetadataScanner,
        { provide: EVENT_SDK_OPTIONS, useValue: options },
        { provide: EVENT_SDK_PRODUCER_TOKEN, useClass: RdKafkaProducer },
        { provide: EVENT_SDK_CONSUMER_TOKEN, useClass: RdKafkaConsumer },
      ],
      exports: [EVENT_SDK_PRODUCER_TOKEN, EVENT_SDK_CONSUMER_TOKEN],
    };
  }
}
