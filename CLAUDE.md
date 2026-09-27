# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

NestJS (TypeScript) backend service. PostgreSQL (TypeORM) + MongoDB (mongoose) for persistence, Kafka + RabbitMQ for messaging, Stripe for payments, SSE/Socket.IO for pubsub. Config via `config` package + `dotenv`, logging via pino/winston/Nest logger (pluggable, pino default), JWT + bcryptjs for auth. Node 22 required (`.nvmrc`).

## Commands

```bash
npm ci                          # install
npm run start:dev               # run with watch (nest start --watch)
npm run build                   # rimraf dist && nest build -p tsconfig.prod.json
npm run lint                    # eslint --fix on src/apps/libs/test
npm run format                  # prettier --write

npm test                        # unit tests (jest, rootDir src, *.spec.ts)
npm run test:watch
npm run test:cov                # unit tests with coverage
npm run test:e2e                # e2e tests (test/e2e/jest.config.json, runInBand, forceExit)
npm run test:bvt                # business verification tests (test/bvt/jest.config.json)

# single test file/pattern
npx jest path/to/file.spec.ts
npx jest -t "test name pattern"
```

Dependency containers (Postgres, MongoDB, Kafka, RabbitMQ) are started via:

```bash
docker-compose up -d postgres mongo kafka-admin rabbitmq
# MongoDB must be initialized as a replica set (required for transactions/migrations):
docker-compose exec -it mongo mongosh --eval 'rs.initiate({ _id: "mongo-set", members: [{ _id: 0, host: "mongo:27017" }]})'
```

### DB migrations

Postgres (TypeORM), scoped per-database (`--db=auth` or `--db=account`):

```bash
npm run migration:typeorm:generate --db=<db> --name=<name>
npm run migration:typeorm:revert --db=<db>
```

MongoDB (mongo-migrate-ts), also scoped per-database:

```bash
npm run migration:mongo:generate --db=<db> --name=<name>
npm run migration:mongo:up --db=<db>
npm run migration:mongo:down --db=<db> -- --last   # undo last
npm run migration:mongo:down --db=<db> -- --all    # undo all
npm run migration:mongo:status --db=<db>
```

## Architecture

### Module layout (`src/modules`)

- `common/` — cross-cutting infrastructure modules, all wired into `AppModule`:
  - `database/` — `@Global()` `DatabaseModule` initializes and exports two separate Postgres `DataSource`s (`auth`, `account` — each its own schema/db, see `POSTGRES_AUTH_TOKEN`/`POSTGRES_ACCOUNT_TOKEN`) plus a Mongo connection (`MONGO_AUTH_TOKEN`). Each logical DB has its own subtree under `postgres/<db>/` or `mongo/<db>/` with `migrations/`, `repositories/`, `schemas/`. Postgres schemas use TypeORM `EntitySchema`; a custom ESLint rule (`eslint-custom-rules/rules/required-column-comment.js`, enforced on `src/**/schemas/**/*.ts`) requires every column to have a `comment`.
  - `event/` — wraps both the built-in NestJS microservices transport (Kafka via `@nestjs/microservices`, RabbitMQ) and a custom in-house Kafka client (`src/packages/event-sdk`, using `kafkajs` or `@confluentinc/kafka-javascript`/rdkafka). Which implementation is active is controlled by `ENV.KAFKA.IS_CUSTOM_CLIENT` / `ENV.RABBITMQ.IS_CUSTOM_CLIENT`.
  - `health/` — Terminus health checks.
- `domain/` — business modules: `auth/` (login, user, user-session, validate — JWT-based), `account/user/`, `payment/gateway/stripe/`, `pubsub/` (socket + SSE).

Each feature module consistently follows a `controllers/ services/ shared/` (dto, interface, const) sub-structure, with `migrations/`/`schemas/`/`repositories/` added for anything owning a database table/collection.

### Shared packages (`src/packages`)

Reusable, framework-adjacent packages not tied to one domain module:

- `event-sdk/` — custom Kafka client abstraction (`EventSdkModule.forKafkajs(...)` / `.forRdKafka(...)`), decorators (`@EventSdkConsumer`), and a global guard (`EventSdkGuard`, registered in bootstrap).
- `logger/` — pluggable logger implementations (`pino/`, `winston/`, `nest-logger/`) behind a shared interface.

### Bootstrap (`src/shared/bootstrap.ts`, `src/main.ts`)

`bootstrap()` creates the Nest app, then in order: security/middleware (`helmet`, body parsers, `express-http-context`, response-time header, global `LoggingInterceptor`, global `CustomExceptionFilter`, global `EventSdkGuard`, global `ValidationPipe`), sets the API base path, configures Swagger, connects microservices (RabbitMQ always, Kafka only if not using the custom client), then listens.

### Configuration (`src/shared/env.ts`, `config/`)

All runtime config is centralized in the `ENV` object (`src/shared/env.ts`), which wraps the `config` package (`config/default.yaml`, `config/custom-environment-variables.yaml`, `config/test.yaml`) plus `.env` overrides. Always read config through `ENV`, not `process.env`/`config` directly, to keep the two Postgres DBs, Mongo, Kafka, RabbitMQ, Stripe, JWT, and logger settings in one typed place.

### Testing

Three independent Jest configs/suites, each with its own coverage/report output dir:

- Unit (`jest.config.js`, rootDir `src`, pattern `*.spec.ts`) → `report-unit-test/`
- E2E (`test/e2e/jest.config.json`, `runInBand --forceExit`, uses `testcontainers` for Postgres/Kafka/RabbitMQ and `mongodb-memory-server`) → `report-e2e-test/`
- BVT/business verification (`test/bvt/jest.config.json`, `runInBand --forceExit`) → `report-bvt-test/`

`moduleNameMapper` maps `src/*` imports for unit tests; e2e/bvt use `tsconfig-paths` at runtime.
