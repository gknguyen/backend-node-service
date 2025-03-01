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
npm run test:bvt
```

## Run DB migration

### Postgres

```bash
npm run typeorm:migration:generate --db=<db> ---name=<name>
npm run typeorm:migration:revert --db=<db>
```
