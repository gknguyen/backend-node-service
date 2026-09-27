import {
  initKafkaInstance,
  initPostgresInstance,
  initRabbitMQInstance,
  initMongoInstance,
} from '../utils';

export = async () => {
  // Started sequentially: starting all containers concurrently overloads the
  // CI runner and can crash one (e.g. Kafka) mid-bootstrap, causing testcontainers
  // to hit a 409 "container is not running" error.
  await initKafkaInstance();
  await initPostgresInstance();
  await initRabbitMQInstance();
  await initMongoInstance();
};
