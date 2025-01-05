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

## Install

```bash
npm ci
```

## Run service

```bash
npm run start:dev
npm run start:prod
```

# Run test

```bash
npm test
npm run test:e2e
```
