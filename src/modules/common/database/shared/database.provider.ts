import { AccountDatabaseProvider } from '../postgres/account/account.provider';
import { AuthDatabaseProvider } from '../postgres/auth/auth.provider';

export const DatabaseProviders = [AuthDatabaseProvider, AccountDatabaseProvider];
