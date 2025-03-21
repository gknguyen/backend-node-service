import {
  initKafkaInstance,
  initPostgresInstance,
  initRabbitMQInstance,
  initMongoInstance,
} from '../utils';

export = async () => {
  await Promise.all([
    initKafkaInstance(),
    initPostgresInstance(),
    initRabbitMQInstance(),
    initMongoInstance(),
  ]);
};
