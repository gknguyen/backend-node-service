import { MongoProviders } from '../mongo/mongo.provider';
import { PostgresProviders } from '../postgres/postgres.provider';

export const DatabaseProviders = [...PostgresProviders, ...MongoProviders];
