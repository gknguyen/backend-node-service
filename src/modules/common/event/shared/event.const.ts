export enum EventTypeEnum {
  Base = 'event.emitted',
  UserCreated = 'event.user.created',
}

export enum RabbitPatternEnum {
  Base = 'rabbitmq.emitted',
}

export enum KafkaTopicEnum {
  Base = 'kafka.emitted',
}

export const KAFKA_SERVICE_TOKEN = 'KAFKA_SERVICE_TOKEN';
export const RABBITMQ_SERVICE_TOKEN = 'RABBITMQ_SERVICE_TOKEN';
