export enum EventTypeEnum {
  Base = 'event.emmitted',
  UserCreated = 'event.user.created',
}

export enum RabbitPatternEnum {
  Base = 'rabbitmq.emmitted',
}

export enum KafkaTopicEnum {
  Base = 'kafka.emmitted',
}

export const KAFKA_SERVICE_TOKEN = 'KAFKA_SERVICE_TOKEN';
export const RABBITMQ_SERVICE_TOKEN = 'RABBITMQ_SERVICE_TOKEN';
