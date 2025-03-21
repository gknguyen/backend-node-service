import { UserInfoRepository } from './account/repositories/user-info.repository';
import { AuthUserRepository } from './auth/repositories/auth-user.repository';

export const PostgresRepositories = [AuthUserRepository, UserInfoRepository];
