import { KafkaJS } from '@confluentinc/kafka-javascript';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { CompressionTypes } from 'kafkajs';
import { IKafkaJS } from 'src/packages/event-sdk';
import { SERVICE_NAME } from '../const';
import ENV from '../env';

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

export function getKafkaCustomOptions(): IKafkaJS.IEventSdkOptions {
  const baseConfig = getKafkaOptions();

  return {
    ...baseConfig,
    client: {
      ...baseConfig.client,
      logLevel: KafkaJS.logLevel.INFO,
    },
    producer: {
      ...baseConfig.send,
      compression: KafkaJS.CompressionTypes.GZIP,
      logLevel: KafkaJS.logLevel.INFO,
    },
    consumer: {
      ...baseConfig.consumer,
      partitionAssigners: [KafkaJS.PartitionAssigners.cooperativeSticky],
      logLevel: KafkaJS.logLevel.INFO,
    },
  };
}
