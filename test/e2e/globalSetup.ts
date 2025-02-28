import { initKafkaInstance, initPostgresInstance, initRabbitMQInstance } from '../utils';

export = async () => {
  await Promise.all([initKafkaInstance(), initPostgresInstance(), initRabbitMQInstance()]);
};
