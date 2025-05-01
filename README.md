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
- Authentication: [jsonwebtoken](https://jwt.io/) + [bcryptjs](https://www.npmjs.com/package/bcryptjs)

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
- Kafka
  - [NestJS Kafka](https://docs.nestjs.com/microservices/kafka) (Default)
  - [confluent-kafka-javascript](https://github.com/confluentinc/confluent-kafka-javascript)

### ORM/ODM

- [TypeORM](https://typeorm.io/)
- [mongoose](https://mongoosejs.com/)

### Database

- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)

## Install

```bash
npm ci
```

## Start dependency containers

```bash
docker-compose up -d postgres mongo kafka-ui rabbitmq
```

### Setup mongo in cluster mode

```bash
docker-compose exec -it mongo mongosh --eval 'rs.initiate({ _id: "mongo-set", members: [{ _id: 0, host: "mongo:27017" }]})'
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
# generate new migration file
npm run migration:typeorm:generate --db=<db> ---name=<name>

# revert migration
npm run migration:typeorm:revert --db=<db>
```

### MongoDB

```bash
# generate new migration file
npm run migration:mongo:generate --db=<db> ---name=<name>

# run migration
npm run migration:mongo:up --db=<db>

# revert migration
npm run migration:mongo:down --db=<db> -- --last  #Undo the last applied migration
npm run migration:mongo:down --db=<db> -- --all   #Undo all applied migrations

# check migration status
npm run migration:mongo:status --db=<db>
```
