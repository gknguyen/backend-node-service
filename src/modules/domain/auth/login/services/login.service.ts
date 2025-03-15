import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ILoginWithPassword } from '../shared/login.interface';
import { UserInfoRepository } from 'src/modules/common/database/postgres/account/repositories/user-info.repository';
import { AUTH_ERRORS } from 'src/exception/const';
import { AuthUserRepository } from 'src/modules/common/database/postgres/auth/repositories/auth-user.repository';
import { getAccessToken, verifyEncodedPassword } from '../../shared/auth.util';
import { LoginResponseDto } from '../shared/login.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    private readonly userInfoRepository: UserInfoRepository,
  ) {}

  async loginWithPassword(input: ILoginWithPassword): Promise<LoginResponseDto> {
    const userInfo = await this.userInfoRepository.getByEmail(input.email);
    if (!userInfo) throw new NotFoundException(AUTH_ERRORS.USER_NOT_EXISTED);

    const authUser = await this.authUserRepository.getByUserId(userInfo.userId);
    if (!authUser) throw new NotFoundException(AUTH_ERRORS.USER_NOT_EXISTED);
    if (!authUser.password) throw new UnauthorizedException(AUTH_ERRORS.INVALID_PASSWORD);

    const isVerified = await verifyEncodedPassword(input.password, authUser.password);
    if (!isVerified) throw new UnauthorizedException(AUTH_ERRORS.INVALID_PASSWORD);

    const accessToken = getAccessToken({
      userId: userInfo.userId,
      email: userInfo.email,
    });

    return { accessToken };
  }
}
