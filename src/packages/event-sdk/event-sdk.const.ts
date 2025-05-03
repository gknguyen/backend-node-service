import { KafkaJS } from '@confluentinc/kafka-javascript';

export * from './shared/shared.const';

const EventSdk = {
  PartitionAssigners: KafkaJS.PartitionAssigners,
  LogLevel: KafkaJS.logLevel,
  CompressionTypes: KafkaJS.CompressionTypes,
};

export { EventSdk };
