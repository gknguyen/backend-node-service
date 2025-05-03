import { KafkaOptions, Transport } from '@nestjs/microservices';
import { CompressionTypes } from 'kafkajs';
import { IKafkaJS, IRdKafka, EventSdk } from 'src/packages/event-sdk';
import { SERVICE_NAME } from '../const';
import ENV from '../env';
import { eventSdkLogger } from '../logger';

export function getKafkaOptions() {
  return {
    client: {
      clientId: SERVICE_NAME,
      brokers: [ENV.KAFKA.BROKER],
      requestTimeout: 30_000,
      connectionTimeout: 10_000,
      enforceRequestTimeout: true,
    },
    consumer: {
      groupId: SERVICE_NAME,
      allowAutoTopicCreation: true,
      fromBeginning: false,
    },
    send: {
      timeout: 30_000,
      compression: CompressionTypes.GZIP,
    },
    run: {
      partitionsConsumedConcurrently: 1,
    },
  };
}

export function getKafkaConfig(): KafkaOptions {
  return {
    transport: Transport.KAFKA,
    options: getKafkaOptions(),
  };
}

export function getKafkaCustomOptionsV1(): IKafkaJS.IEventSdkOptions {
  const baseConfig = getKafkaOptions();

  return {
    ...baseConfig,
    client: {
      ...baseConfig.client,
      logLevel: EventSdk.LogLevel.INFO,
      logger: eventSdkLogger,
      retry: {
        initialRetryTime: 300,
        maxRetryTime: 30_000,
        retries: 5,
      },
    },
    producer: {
      ...baseConfig.send,
      compression: EventSdk.CompressionTypes.GZIP,
      logLevel: EventSdk.LogLevel.INFO,
    },
    consumer: {
      ...baseConfig.consumer,
      partitionAssigners: [EventSdk.PartitionAssigners.cooperativeSticky],
      logLevel: EventSdk.LogLevel.INFO,
    },
  };
}

export function getKafkaCustomOptionsV2(): IRdKafka.IEventSdkOptions {
  return {
    client: {
      'client.id': SERVICE_NAME,
      'metadata.broker.list': ENV.KAFKA.BROKER,
      'socket.timeout.ms': 30_000,
      'socket.connection.setup.timeout.ms': 10_000,
      'allow.auto.create.topics': true,
      'retry.backoff.ms': 300,
      'reconnect.backoff.max.ms': 30_000,
    },
    producer: {
      'compression.codec': EventSdk.CompressionTypes.GZIP,
      log_level: EventSdk.LogLevel.DEBUG,
      'message.send.max.retries': 5,
    },
    producerTopic: {
      'message.timeout.ms': 30_000,
      'delivery.timeout.ms': 30_000,
    },
    consumer: {
      'group.id': SERVICE_NAME,
      'partition.assignment.strategy': EventSdk.PartitionAssigners.cooperativeSticky,
      log_level: EventSdk.LogLevel.DEBUG,
      debug: 'consumer',
    },
    consumerTopic: {
      'auto.offset.reset': 'latest',
    },
    logger: eventSdkLogger,
  };
}
