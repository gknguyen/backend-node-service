import { AccountDatabaseProvider } from './account/account.provider';
import { AuthDatabaseProvider } from './auth/auth.provider';

export const PostgresProviders = [AuthDatabaseProvider, AccountDatabaseProvider];
