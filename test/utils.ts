import { KafkaContainer } from '@testcontainers/kafka';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { RabbitMQContainer } from '@testcontainers/rabbitmq';
import { GenericContainer } from 'testcontainers';
import { promisify } from 'util';

export const wait = promisify(setTimeout);

export async function initAppInstance(): Promise<void> {
  // console.log(process.env.DATABASE_AUTH_HOST);
  // console.log(process.env.DATABASE_AUTH_PORT);
  // console.log(process.env.DATABASE_ACCOUNT_HOST);
  // console.log(process.env.DATABASE_ACCOUNT_PORT);

  const appContainer = await GenericContainer.fromDockerfile('./').build('app', {
    deleteOnExit: true,
  });

  await appContainer
    .withName('app')
    .withExposedPorts(4300)
    .withEnvironment({
      NODE_ENV: 'production',
      SERVICE_PORT: '4300',
      // ...(process.env.RABBITMQ_URI && {
      //   RABBITMQ_URI: process.env.RABBITMQ_URI,
      // }),
      ...(process.env.KAFKA_BROKER && {
        KAFKA_BROKER: process.env.KAFKA_BROKER,
      }),
      ...(process.env.DATABASE_AUTH_HOST && {
        DATABASE_AUTH_HOST: process.env.DATABASE_AUTH_HOST,
      }),
      ...(process.env.DATABASE_ACCOUNT_HOST && {
        DATABASE_ACCOUNT_HOST: process.env.DATABASE_ACCOUNT_HOST,
      }),
      RABBITMQ_URI:
        'amqps://njhhkiwz:EDhqd1C5lYfL6vwWYG18b-ulOc2Xo4WU@armadillo.rmq.cloudamqp.com/njhhkiwz',
      STRIPE_PUBLIC_KEY:
        'pk_test_51NnjM1K4XIYVrqWMBKhjJSFWVKzteANmy9y12FV7wRJ7unus7pYRB0NEZM4smmFi4SN72RwnKOJqChbJjeC5T63400hcpJo82v',
      STRIPE_SECRET_KEY:
        'sk_test_51NnjM1K4XIYVrqWMrg8akQKSKXDTk6eqsiRoYHILngcB0le8pJjIczeZhsMJv8J4yAJxU8Dq6KDjz2tbv07EQnGH00gWDByL8t',
    })
    .start();
}

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
