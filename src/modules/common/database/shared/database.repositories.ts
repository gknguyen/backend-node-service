import { UserInfoRepository } from '../postgres/account/repositories/user-info.repository';
import { AuthUserRepository } from '../postgres/auth/repositories/auth-user.repository';

export const DatabaseRepositories = [AuthUserRepository, UserInfoRepository];
