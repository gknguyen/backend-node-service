# Backend service

## Technical Approach

### Core

- Programming language: [Typescript](https://www.typescriptlang.org/)
- Framework: [NestJS](https://nestjs.com/)
- Formatter: [Prettier](https://prettier.io/)
- Code quality scanner: [Eslint](https://eslint.org/)
- Pre-commit checker: [CommitLint](https://commitlint.js.org/) + [Husky](https://typicode.github.io/husky/)
- API docs: [Swagger UI](https://swagger.io/tools/swagger-ui/)
- ENV manager: [config](https://github.com/node-config/node-config) + [dotenv](https://github.com/motdotla/dotenv)

### Testing:

- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest)

### Logger:

- [pino](https://getpino.io/#/) (Default)
- [winston](https://github.com/winstonjs/winston)
- [NestJS logger](https://docs.nestjs.com/techniques/logger#extend-built-in-logger)

### Payment Gateway

- [stripe](https://stripe.com/)

### Pubsub

- [NestJS SSE](https://docs.nestjs.com/techniques/server-sent-events)
- [NestJS Socket.IO](https://docs.nestjs.com/websockets/gateways)

### Message Streaming

- [NestJS Event](https://docs.nestjs.com/techniques/events)
- [NestJS RabbitMQ](https://docs.nestjs.com/microservices/rabbitmq)
- [NestJS Kafka](https://docs.nestjs.com/microservices/kafka)

### ORM/ODM

- [TypeORM](https://typeorm.io/)

### Database

- [PostgreSQL](https://www.postgresql.org/)

## Install

```bash
npm ci
```

## Run service

```bash
npm run start:dev
npm run start:prod
```

## Run test

```bash
npm test
npm run test:e2e
```

## Run DB migration

### Postgres

```bash
npm run typeorm:migration:generate --db=<db> ---name=<name>
npm run typeorm:migration:revert --db=<db>
```

```bash
docker network create --driver bridge backend-network

docker run -d --name rabbitmq --network backend-network -p 5672:5672 \
  rabbitmq

docker run -d --name zookeeper --network backend-network -p 2181:2181 \
  -e ALLOW_ANONYMOUS_LOGIN=yes \
  bitnami/zookeeper

docker run -d --name kafka --network backend-network -p 9092:9092 \
  -e ALLOW_PLAINTEXT_LISTENER=yes \
  -e KAFKA_BROKER_ID=1 \
  -e KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=INTERNAL:PLAINTEXT,LOCAL:PLAINTEXT \
  -e KAFKA_CFG_LISTENERS=INTERNAL://kafka:29092,LOCAL://kafka:9092 \
  -e KAFKA_CFG_ADVERTISED_LISTENERS=INTERNAL://kafka:29092,LOCAL://localhost:9092 \
  -e KAFKA_INTER_BROKER_LISTENER_NAME=INTERNAL \
  -e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181 \
  bitnami/kafka

docker run -d --name postgres --network backend-network -p 5432:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=postgres \
  postgres


docker build --file Dockerfile --target production --tag backend-node-service:local .

docker run -d --name app --network backend-network -p 4200:4200 \
  -e NODE_ENV=production \
  -e SERVICE_PORT=4200 \
  -e STRIPE_PUBLIC_KEY=pk_test_51NnjM1K4XIYVrqWMBKhjJSFWVKzteANmy9y12FV7wRJ7unus7pYRB0NEZM4smmFi4SN72RwnKOJqChbJjeC5T63400hcpJo82v \
  -e STRIPE_SECRET_KEY=sk_test_51NnjM1K4XIYVrqWMrg8akQKSKXDTk6eqsiRoYHILngcB0le8pJjIczeZhsMJv8J4yAJxU8Dq6KDjz2tbv07EQnGH00gWDByL8t \
  -e RABBITMQ_URI=amqp://rabbitmq:5672 \
  -e KAFKA_BROKER=kafka:29092 \
  -e DATABASE_AUTH_HOST=postgres \
  -e DATABASE_AUTH_DATABASE=postgres \
  -e DATABASE_ACCOUNT_HOST=postgres \
  -e DATABASE_ACCOUNT_DATABASE=postgres \
  backend-node-service:local
```
