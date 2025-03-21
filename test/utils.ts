import { KafkaContainer } from '@testcontainers/kafka';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { RabbitMQContainer } from '@testcontainers/rabbitmq';
import { promisify } from 'util';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

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

  process.env.POSTGRES_AUTH_HOST = process.env.POSTGRES_ACCOUNT_HOST = host;
  process.env.POSTGRES_AUTH_PORT = process.env.POSTGRES_ACCOUNT_PORT = port.toString();
  process.env.POSTGRES_AUTH_USER = process.env.POSTGRES_ACCOUNT_USER = user;
  process.env.POSTGRES_AUTH_PASSWORD = process.env.POSTGRES_ACCOUNT_PASSWORD = password;
  process.env.POSTGRES_AUTH_DATABASE = process.env.POSTGRES_ACCOUNT_DATABASE = database;

  (global as any).__POSTGRES_INSTANCE = postgresContainer;
}

export async function initRabbitMQInstance(): Promise<void> {
  /** use image "rabbitmq:management" */
  const rabbitMQContainer = await new RabbitMQContainer().withName('rabbitmq').start();

  process.env.RABBITMQ_URI = rabbitMQContainer.getAmqpUrl();

  (global as any).__RABBITMQ_INSTANCE = rabbitMQContainer;
}

export async function initMongoInstance(): Promise<void> {
  const mongoServer = await MongoMemoryReplSet.create({
    replSet: {
      count: 1,
      storageEngine: 'wiredTiger',
    },
    binary: {
      version: '8.0.5',
      downloadDir: 'node_modules/.cache/mongodb-memory-server/mongodb-binaries',
    },
  });

  const uri = mongoServer.getUri();
  const { host, port } = parseMongoURI(uri);

  process.env.MONGODB_AUTH_HOST = host;
  process.env.MONGODB_AUTH_PORT = port;

  (global as any).__MONGO_INSTANCE = mongoServer;
}

function parseMongoURI(uri: string) {
  const regex = /mongodb:\/\/(?<host>[^:\/]+)(?::(?<port>\d+))?\/?(?:\?(?<params>.*))?/;
  const match = uri.match(regex);

  if (!match || !match.groups) {
    throw new Error('Invalid MongoDB URI');
  }

  return {
    host: match.groups.host,
    port: match.groups.port || '27017', // Default MongoDB port
  };
}
