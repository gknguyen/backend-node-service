import {
  initAppInstance,
  initKafkaInstance,
  initPostgresInstance,
  initRabbitMQInstance,
  wait,
} from '../utils';

export = async () => {
  await Promise.all([initKafkaInstance(), initPostgresInstance(), initRabbitMQInstance()]);
  await initAppInstance();
  await wait(5000);
};
