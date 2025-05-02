import { KafkaJS } from '@confluentinc/kafka-javascript';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { CompressionTypes } from 'kafkajs';
import { IKafkaJS, IRdKafka } from 'src/packages/event-sdk';
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
      logLevel: KafkaJS.logLevel.INFO,
      logger: eventSdkLogger,
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

export function getKafkaCustomOptionsV2(): IRdKafka.IEventSdkOptions {
  return {
    client: {
      'client.id': SERVICE_NAME,
      'metadata.broker.list': ENV.KAFKA.BROKER,
      'api.version.request.timeout.ms': 30_000,
      'socket.connection.setup.timeout.ms': 10_000,
      'allow.auto.create.topics': true,
    },
    producer: {
      'compression.codec': 'gzip',
      log_level: KafkaJS.logLevel.DEBUG,
    },
    producerTopic: {
      'message.timeout.ms': 30_000,
    },
    consumer: {
      'group.id': SERVICE_NAME,
      'partition.assignment.strategy': KafkaJS.PartitionAssigners.cooperativeSticky,
      log_level: KafkaJS.logLevel.DEBUG,
      debug: 'consumer',
    },
    consumerTopic: {
      'auto.offset.reset': 'latest',
    },
    logger: eventSdkLogger,
  };
}
