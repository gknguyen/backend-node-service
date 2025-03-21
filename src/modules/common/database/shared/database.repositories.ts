import { MongoRepositories } from '../mongo/mongo.repository';
import { PostgresRepositories } from '../postgres/postgres.repository';

export const DatabaseRepositories = [...PostgresRepositories, ...MongoRepositories];
