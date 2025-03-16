import { StartedKafkaContainer } from '@testcontainers/kafka';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { StartedRabbitMQContainer } from '@testcontainers/rabbitmq';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

export = async () => {
  const postgresContainer: StartedPostgreSqlContainer = (global as any).__POSTGRES_INSTANCE;
  const kafkaContainer: StartedKafkaContainer = (global as any).__KAFKA_INSTANCE;
  const rabbitMQContainer: StartedRabbitMQContainer = (global as any).__RABBITMQ_INSTANCE;
  const mongoServer: MongoMemoryReplSet = (global as any).__MONGO_INSTANCE;

  await Promise.all([
    kafkaContainer.stop(),
    postgresContainer.stop(),
    rabbitMQContainer.stop(),
    mongoServer.stop({ doCleanup: true, force: true }),
  ]);
};
