import { KafkaContainer } from '@testcontainers/kafka';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { RabbitMQContainer } from '@testcontainers/rabbitmq';
import { promisify } from 'util';

export const wait = promisify(setTimeout);

export async function initKafkaInstance(): Promise<void> {
  /** use image "confluentinc/cp-kafka" */
  const kafkaContainer = await new KafkaContainer()
    .withName('kafka')
    .withExposedPorts(9092)
    .start();

  const host = kafkaContainer.getHost();
  const port = kafkaContainer.getMappedPort(9092);

  process.env.KAFKA_BROKER = `${host}:${port}`;

  (global as any).__KAFKA_INSTANCE = kafkaContainer;
}

export async function initPostgresInstance(): Promise<void> {
  /** use image "postgres" */
  const postgresContainer = await new PostgreSqlContainer()
    .withName('postgres')
    .withDatabase('test')
    .withUsername('postgres')
    .withPassword('postgres')
    .withExposedPorts(5432)
    .start();

  const host = postgresContainer.getHost();
  const port = postgresContainer.getMappedPort(5432);
  const database = postgresContainer.getDatabase();
  const user = postgresContainer.getUsername();
  const password = postgresContainer.getPassword();

  process.env.DATABASE_AUTH_HOST = process.env.DATABASE_ACCOUNT_HOST = host;
  process.env.DATABASE_AUTH_PORT = process.env.DATABASE_ACCOUNT_PORT = port.toString();
  process.env.DATABASE_AUTH_USER = process.env.DATABASE_ACCOUNT_USER = user;
  process.env.DATABASE_AUTH_PASSWORD = process.env.DATABASE_ACCOUNT_PASSWORD = password;
  process.env.DATABASE_AUTH_DATABASE = process.env.DATABASE_ACCOUNT_DATABASE = database;

  (global as any).__POSTGRES_INSTANCE = postgresContainer;
}

export async function initRabbitMQInstance(): Promise<void> {
  /** use image "rabbitmq:management" */
  const rabbitMQContainer = await new RabbitMQContainer().withName('rabbitmq').start();

  process.env.RABBITMQ_URI = rabbitMQContainer.getAmqpUrl();

  (global as any).__RABBITMQ_INSTANCE = rabbitMQContainer;
}
