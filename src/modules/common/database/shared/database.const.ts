export enum DatabaseType {
  Postgres = 'postgres',
  Mongo = 'mongo',
}

export enum DatabaseDomain {
  Auth = 'auth',
  Account = 'account',
}

export enum TableName {
  AuthUser = 'auth_user',
  UserInfo = 'user_info',
  UserSession = 'user_session',
}

export const POSTGRES_AUTH_TOKEN = `${DatabaseType.Postgres}-${DatabaseDomain.Auth}`;
export const POSTGRES_ACCOUNT_TOKEN = `${DatabaseType.Postgres}-${DatabaseDomain.Account}`;

export const MONGO_AUTH_TOKEN = `${DatabaseType.Mongo}-${DatabaseDomain.Auth}`;
